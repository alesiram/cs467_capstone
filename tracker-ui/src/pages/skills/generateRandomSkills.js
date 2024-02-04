// CREATED BY GPT 4.0

// Generate 5 random skills (if the user does not have any - PLACEHOLDER DURING TESTING)
const generateRandomSkills = () => {

    // Random names for skills and references
    const skillNames = ['JavaScript', 'Python', 'Project Management', 'Graphic Design', 'Data Analysis'];
    const references = ['Jane Doe', 'John Smith', 'Alex Johnson', 'Chris Lee', 'Sam Morgan'];

    // Random rating generator
    const randomRating = () => Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5

    // Randomize helper function
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

    // Empty array to hold skills
    const skills = [];

    // Randomize 5 skills
    for (let i = 0; i < 5; i++) {
        skills.push({
            _id: `dummy-skill-${i + 1}-${Date.now()}-${Math.random()}`,
            name: randomElement(skillNames),
            rating: randomRating(),
            reference: randomElement(references)
        });
    }

    return skills;
};

export default generateRandomSkills;