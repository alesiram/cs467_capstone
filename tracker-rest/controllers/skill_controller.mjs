// CREATED BY GPT 4.0

import Skill from '../models/skill_model.mjs'; // Adjust the path as necessary
import Contact from '../models/contact_model.mjs'; // Adjust the path as necessary

// Create a new skill
export const createSkill = async (req, res) => {
    try {
        let referenceObjId = null; // Assume no reference by default
        if (req.body.reference) {
            const referenceObj = await Contact.findOne({ _id: req.body.reference });
            if (referenceObj) {
                referenceObjId = referenceObj._id; // Use the ObjectId of the found Contact
            } else {
                // Handle the case where the reference does not exist
                return res.status(404).json({ message: 'Reference contact not found' });
            }
        }
        const newSkill = new Skill({
            name: req.body.name,
            rating: req.body.rating,
            user: req.user._id, // Set the user ID from the authenticated user
            reference: referenceObjId,
        });

        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
};



// Comprehensive getSkills function
export const getSkills = async (req, res) => {
    try {
        const matchQuery = { user: req.user._id }; // Base match query to always filter by the authenticated user

        // Add basic rating filter if specified
        if (req.query.minRating || req.query.maxRating) {
            matchQuery.rating = {};
            if (req.query.minRating) {
                matchQuery.rating.$gte = parseInt(req.query.minRating);
            }
            if (req.query.maxRating) {
                matchQuery.rating.$lte = parseInt(req.query.maxRating);
            }
        }

        const pipeline = [
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: 'contacts', // Adjust this to your contacts collection name
                    localField: 'reference',
                    foreignField: '_id',
                    as: 'contactDetails'
                }
            },
            {
                $unwind: {
                    path: '$contactDetails',
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        // Add search by skill name or contact name
        if (req.query.search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { 'contactDetails.name': { $regex: req.query.search, $options: 'i' } }
                    ]
                }
            });
        }

        // Dynamic sorting based on query parameters
        let sortField = 'name'; // default sort by skill name
        if (req.query.sortBy) {
            if (req.query.sortBy === 'rating') {
                sortField = 'rating';
            } else if (req.query.sortBy === 'contactName') {
                sortField = 'contactDetails.name';
            }
            // For skill name, it remains 'name'
        }
        const sortOrder = req.query.order === 'desc' ? -1 : 1; // Default ascending

        pipeline.push({
            $sort: { [sortField]: sortOrder }
        });

        const skills = await Skill.aggregate(pipeline);

        if (skills.length === 0) {
            return res.status(404).json({ message: 'No skills found' });
        }

        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// Function to retrieve a specific skill for the authenticated user
export const getSkill = async (req, res) => {
  try {
      const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
      if (!skill) {
          return res.status(404).json({ message: 'Skill not found' });
      }
      res.status(200).json(skill);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Update a skill
export const updateSkill = async (req, res) => {
    try {
        // Convert reference to ObjectId and validate if provided
        let referenceObjId = null; // Assume no reference by default
        if (req.body.reference) {
            const referenceObj = await Contact.findOne({ _id: req.body.reference });
            if (referenceObj) {
                referenceObjId = referenceObj._id; // Use the ObjectId of the found Contact
            } else {
                // Handle the case where the reference does not exist
                return res.status(404).json({ message: 'Reference contact not found' });
            }
            req.body.reference = referenceObjId;
        }
        const skill = await Skill.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a skill
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found to delete' });
        }
        res.status(200).json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aggregate most overall skill data to share
export const getMostPopularSkill = async (req, res) => {
    try {
      const mostPopularSkill = await Skill.aggregate([
        // Step 1: Group by skill name and count occurrences
        { $group: { _id: "$name", count: { $sum: 1 }, averageRating: { $avg: "$rating" } } },
        // Step 2: Sort by count in descending order to get the most popular skill first
        { $sort: { count: -1 } },
        // Step 3: Optionally, limit to a certain number of top skills, e.g., top 1
        { $limit: 1 }
      ]);
  
      if (!mostPopularSkill.length) {
        return res.status(404).json({ message: 'No skills found' });
      }
  
      res.json(mostPopularSkill[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
