import ContactsMetricsPieChart from './ContactsMetricsPieChart';
import ContactsMetricsFollowUps from './ContactsMetricsFollowUps';
import ContactsMetricsStrengthReferral from './ContactsMetricsStrengthReferral';
import ContactsMetricsTable from './ContactsMetricsTable';

// Dashboard metrics
const ContactsMetrics = ({ contacts }) => {
    return (
        <div className="contact-metrics-container">
            {/* Display Pie Chart of Contact by Type */}
            <div className="contact-metric">
                <h3>Contacts By Type</h3>
                <ContactsMetricsPieChart data={contacts} />
            </div>
            {/* Display List of Follow Up Dates */}
            <div className="contact-metric">
                <h3>Upcoming Follow Ups</h3>
                <ContactsMetricsFollowUps contacts={contacts}/>
            </div>
            {/* Display Breakdown of Strength of Connections & Referrals */}
            <div className="contact-metric">
                <h3>Strength & Referral Analysis</h3>
                <ContactsMetricsStrengthReferral contacts={contacts}/>
            </div>
            {/* Display Table Breakdown for Types/Methods */}
            <div className="contact-metric">
                <h3>Other Breakdowns</h3>
                <ContactsMetricsTable contacts={contacts}/>
            </div>
        </div>
    );
};

export default ContactsMetrics;