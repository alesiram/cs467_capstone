import { Button, Select, MenuItem, FormControl } from '@mui/material';

// Contacts searchbar and filtering
const ContactsSearchBar = ({
    contacts,
    displayedContacts,
    setDisplayedContacts,
    searchQuery,
    setSearchQuery,
    selectedStrengthFilter,
    setSelectedStrengthFilter,
    followUpComparisonFilter,
    setFollowUpComparisonFilter,
    followUpDateFilter,
    setFollowUpDateFilter,
    referralPotentialFilter,
    setReferralPotentialFilter,
    sortOptionFilter,
    setSortOptionFilter,
    showSearchFieldsInfo,
    setShowSearchFieldsInfo,
    showAdvancedFilter,
    setShowAdvancedFilter,
    filtersApplied,
    setFiltersApplied,
    setSearchMessage,
    clearAllSearchFilters }) => {

    // Comparison options for follow up date filtering
    const comparisonOptions = [
        { value: 'less', label: 'Less Than' },
        { value: 'equal', label: 'Equal To' },
        { value: 'greater', label: 'Greater Than' },
    ];

    // Strength descriptions for strength of connection filtering
    const strengthDescriptions = {
        '1': 'Very Low',
        '2': 'Low',
        '3': 'Moderate',
        '4': 'High',
        '5': 'Very High'
    };

    // Sort functions for certain fields
    const sortFunctions = {
        'name-asc': (a, b) => a.name.localeCompare(b.name),
        'name-desc': (a, b) => b.name.localeCompare(a.name),
        'company-asc': (a, b) => a.company.localeCompare(b.company),
        'company-desc': (a, b) => b.company.localeCompare(a.company),
        'followUpDate-asc': (a, b) => new Date(a.followUpDate || '9999-12-31') - new Date(b.followUpDate || '9999-12-31'),
        'connectionRating-asc': (a, b) => b.strengthOfConnection - a.strengthOfConnection,
        'referral-yes': (a, b) => (a.referralPotential === b.referralPotential) ? 0 : a.referralPotential ? -1 : 1,
        'contactType-asc': (a, b) => a.contactType.localeCompare(b.contactType),
    };

    // Handle the dynamic search based on provided query
    const handleDynamicSearch = (e) => {

        // Get the query (i.e. event value)
        const query = e.target.value.trim();
        setShowSearchFieldsInfo(false);
        setSearchQuery(query);

        // If query is empty, reset displayed contacts and clear any search message
        if (!query) {
            setDisplayedContacts(contacts);
            setSearchMessage('');
            // Exit early
            return;
        }

        // Disregard upper/lower cases
        const queryLower = query.toLowerCase();

        // Filter the contacts to search various fields in the contacts data
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(queryLower) ||
            contact.company.toLowerCase().includes(queryLower) ||
            contact.email.toLowerCase().includes(queryLower) ||
            contact.phoneNumbers.some(phone => phone.number.toLowerCase().includes(queryLower)) ||
            (contact.notes && contact.notes.toLowerCase().includes(queryLower)) ||
            contact.contactType.toLowerCase().includes(queryLower) ||
            (contact.interactionType && contact.interactionType.toLowerCase().includes(queryLower)) ||
            (contact.sourceOfContact && contact.sourceOfContact.toLowerCase().includes(queryLower)) ||
            (contact.statusOfInteraction && contact.statusOfInteraction.toLowerCase().includes(queryLower)) ||
            (contact.preferredContactMethod && contact.preferredContactMethod.toLowerCase().includes(queryLower))
        );

        // Show message if no results and clear displayed contacts if no results
        if (filteredContacts.length === 0) {
            setSearchMessage('No results found.');
            setDisplayedContacts([]);
        }
        // Clear message when there are results and update displayed contacts with searched results
        else {
            setSearchMessage('');
            setDisplayedContacts(filteredContacts);
        }
    };

    // Apply all filters
    const handleApplyAllFilters = () => {

        // Update state to denote filters are applied, do not show advanced filter
        setFiltersApplied(true);
        setShowAdvancedFilter(false);

        // Start with the displayed contacts
        let filteredContacts = displayedContacts;

        // Apply strength of connection filter if selected
        if (selectedStrengthFilter.length > 0) {
            filteredContacts = filteredContacts.filter(contact =>
                selectedStrengthFilter.includes(contact.strengthOfConnection.toString())
            );
        }
        // Filter by followUpDate if a comparison and date are selected
        if (followUpComparisonFilter && followUpDateFilter) {
            const inputDate = new Date(followUpDateFilter);
            filteredContacts = filteredContacts.filter(contact => {
                // Exclude contacts without followUpDate immediately
                if (!contact.followUpDate) return false;
                const contactDate = new Date(contact.followUpDate);
                return (followUpComparisonFilter === 'less' && contactDate < inputDate) ||
                    (followUpComparisonFilter === 'equal' && contactDate.getTime() === inputDate.getTime()) ||
                    (followUpComparisonFilter === 'greater' && contactDate > inputDate);
            });
        }
        // Filter by referralPotential if selected
        if (referralPotentialFilter !== "") {
            // convert boolean to string
            const isReferralPotential = referralPotentialFilter === "true";
            filteredContacts = filteredContacts.filter(contact =>
                contact.referralPotential === isReferralPotential
            );
        }
        // Apply sorting based on sorting option if selected
        const sortFunction = sortFunctions[sortOptionFilter];
        if (sortFunction) {
            filteredContacts = [...filteredContacts].sort(sortFunction);
        }

        // Update displayed contacts with filtered contacts
        setDisplayedContacts(filteredContacts);

        // If there are no filtered contacts set message
        if (filteredContacts.length === 0) {
            setSearchMessage('No results found.');
        }

    };

    // Handle clearing text from search query in search field
    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchMessage('');
        setShowSearchFieldsInfo(false);
        setDisplayedContacts(contacts);
    };

    // Handle when a user cancels a filter by clearing all filter inputs
    const handleCancelFilter = () => {
        setSelectedStrengthFilter([]);
        setFollowUpDateFilter('');
        setFollowUpComparisonFilter('');
        setReferralPotentialFilter('');
        setSortOptionFilter('');
        setShowAdvancedFilter(false);
        setShowSearchFieldsInfo(false);
    }

    // Handle reset of all search & filter inputs, and update displayed contacts to show all contacts
    const handleResetSearchFilters = () => {
        clearAllSearchFilters();
        setDisplayedContacts(contacts);
    }

    return (
        <>
            {/* Text Search Bar */}
            {!filtersApplied && (
                <div className="contact-search-bar">
                    <input
                        type="text"
                        placeholder="Search contacts by name, company, email, ..."
                        value={searchQuery}
                        onChange={handleDynamicSearch}

                    />
                    <Button
                        className="contact-search-bar-clear-search-button"
                        onClick={handleClearSearch}
                        disabled={searchQuery ? false : true}
                        aria-label="Clear search"
                        sx={{ ml: 2, backgroundColor: 'var(--background-color)', color: 'var(--secondary-color)' }}
                    >
                        Clear
                    </Button>
                </div>
            )}
            <div>
                {/* Buttons to toggle for additional filtering or more information on search */}
                <div className="contact-search-filter-info-toggle-div">
                    {!showAdvancedFilter && !filtersApplied && (
                        <>
                            <Button
                                className="contact-search-show-filter-button" onClick={() => setShowAdvancedFilter(true)}
                                sx={{ ml: 2, mb: 1, backgroundColor: 'var(--background-color)', color: 'var(--secondary-color)' }}
                            >
                                Filter
                            </Button>
                            <Button
                                className="contact-search-info-toggle-button" onClick={() => setShowSearchFieldsInfo(prev => !prev)}
                                sx={{ ml: 2, mb: 1, backgroundColor: 'var(--background-color)', color: 'var(--secondary-color)' }}
                            >
                                Info
                            </Button>
                            {/* Display info to notify user of which fields will be searched */}
                            {showSearchFieldsInfo && (
                                <span className="contact-search-fields-info">
                                    <ul className="contact-search-fields-info-list">
                                        <li><strong>Searched Fields:</strong></li>
                                        <li>Name</li>
                                        <li>Company</li>
                                        <li>Email</li>
                                        <li>Phone Numbers</li>
                                        <li>Notes</li>
                                        <li>Contact Type</li>
                                        <li>Interaction Type</li>
                                        <li>Source Of Contact</li>
                                        <li>Status Of Interaction</li>
                                        <li>Preferred Contact Method</li>
                                        <li> -------- </li>
                                        <li><strong>Click Info Button to Close</strong></li>
                                    </ul>
                                </span>
                            )}
                        </>
                    )}
                </div>
                {/* Advanced Filtering and Sorting Options */}
                {showAdvancedFilter && (
                    <div className="contact-advanced-filter-div">
                        {/* Strength of Connection */}
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <label htmlFor="">Strength Of Connection</label>
                            <Select
                                className="contact-filter-strength-of-connection-select"
                                multiple={true}
                                value={selectedStrengthFilter}
                                sx={{
                                    mt: 1,
                                    border: '1px solid var(--primary-color)',
                                    backgroundColor: 'var(--text-color)',
                                    color: 'var(--button-text-color)',
                                    '& .MuiSelect-icon': {
                                        color: 'var(--primary-color)',
                                    },
                                }}
                                onChange={(e) => setSelectedStrengthFilter(e.target.value)}>
                                {Object.entries(strengthDescriptions).map(([value, description]) => (
                                    <MenuItem key={value} value={value}>{description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Follow Up Date */}
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <label htmlFor="">Follow Up Date</label>
                            <div className="contact-filter-follow-up-date-select-input-div">
                                <Select
                                    className="contact-filter-comparison-select"
                                    value={followUpComparisonFilter}
                                    sx={{
                                        mt: 1,
                                        mr: 2,
                                        width: '40%',
                                        border: '1px solid var(--primary-color)',
                                        backgroundColor: 'var(--text-color)',
                                        color: 'var(--button-text-color)',
                                        '& .MuiSelect-icon': {
                                            color: 'var(--primary-color)',
                                        },
                                    }}
                                    onChange={(e) => setFollowUpComparisonFilter(e.target.value)}>
                                    <MenuItem value="">Select Comparison</MenuItem>
                                    {comparisonOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                                <input
                                    className="contact-filter-follow-up-date-input"
                                    type="date"
                                    value={followUpDateFilter}
                                    onChange={(e) => setFollowUpDateFilter(e.target.value)}
                                />
                            </div>
                        </FormControl>
                        {/* Referral Potential */}
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <label htmlFor="">Referral Potential</label>
                            <Select
                                value={referralPotentialFilter}
                                onChange={(e) => setReferralPotentialFilter(e.target.value)}
                                sx={{
                                    mt: 1,
                                    border: '1px solid var(--primary-color)',
                                    backgroundColor: 'var(--text-color)',
                                    color: 'var(--button-text-color)',
                                    '& .MuiSelect-icon': {
                                        color: 'var(--primary-color)',
                                    },
                                }}
                            >
                                <MenuItem value="">Select Referral Potential</MenuItem>
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Sort Options */}
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <label htmlFor="">Sort Options For Results</label>
                            <Select
                                value={sortOptionFilter}
                                onChange={(e) => setSortOptionFilter(e.target.value)}
                                sx={{
                                    mt: 1,
                                    border: '1px solid var(--primary-color)',
                                    backgroundColor: 'var(--text-color)',
                                    color: 'var(--button-text-color)',
                                    '& .MuiSelect-icon': {
                                        color: 'var(--primary-color)',
                                    },
                                }}
                            >
                                <MenuItem value="">Select Sort Option</MenuItem>
                                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                                <MenuItem value="company-asc">Company (A-Z)</MenuItem>
                                <MenuItem value="company-desc">Company (Z-A)</MenuItem>
                                <MenuItem value="followUpDate-asc">Follow Up Date (Nearest-Furthest)</MenuItem>
                                <MenuItem value="connectionRating-asc">Connection Rating (High-Low)</MenuItem>
                                <MenuItem value="referral-yes">Referral (Yes-No)</MenuItem>
                                <MenuItem value="contactType-asc">Contact Type (A-Z)</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            className="contact-filter-apply-filters-button"
                            onClick={handleApplyAllFilters}
                            sx={{ mb: 1, mr: 1, backgroundColor: 'var(--background-color)', color: 'var(--secondary-color)' }}
                        >
                            Apply Filters
                        </Button>
                        <Button
                            className="contact-filter-cancel-filters-button"
                            onClick={handleCancelFilter}
                            sx={{ mb: 1, ml: 1, backgroundColor: 'var(--background-color)', color: 'var(--secondary-color)' }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
                {filtersApplied && (
                    <div className="contact-search-filter-clear-filters-div">
                        <Button className="contact-search-filter-clear-filters-button" onClick={handleResetSearchFilters}>Clear Filters</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactsSearchBar;
