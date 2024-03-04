import React, { useRef, useEffect, useState } from 'react';

// Draw the pie chart with the context, chart data and canvas size
const drawChart = (ctx, chartData, canvasSize) => {

    // For sizing
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = canvasSize / 2 * 0.8; // 80% of half the canvas size

    // Starting point on circle
    let startAngle = 0;

    // Total value for the chart (i.e. User's total contacts)
    let totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

    // For each data point, draw the slice/fill labeling
    chartData.forEach(data => {

        // Calculate the slice and end angle
        const sliceAngle = (2 * Math.PI * data.value) / totalValue;
        const endAngle = startAngle + sliceAngle;

        // Draw the slice
        ctx.fillStyle = data.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Calculate the percentage for the slice
        const percentage = ((data.value / totalValue) * 100).toFixed(1); // Keep one decimal place

        // Determine the position for the percentage text
        const textX = centerX + radius / 2 * Math.cos(startAngle + sliceAngle / 2);
        const textY = centerY + radius / 2 * Math.sin(startAngle + sliceAngle / 2);

        // Set the style for the percentage text
        ctx.fillStyle = "#FFFFFF"; // Use white for better visibility on primary/secondary colors
        ctx.font = "bold 13px Arial"; // Make the font bold
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw the percentage on the chart
        ctx.fillText(`${percentage}%`, textX, textY);

        // Move the start angle to draw next slice
        startAngle += sliceAngle;
    });
};

// Contacts metrics pie chart component
const ContactsMetricsPieChart = ({ data }) => {

    const canvasRef = useRef(null); // Initialize reference to null
    const [isEmpty, setIsEmpty] = useState(false); // State to track if data is empty
    const [legendData, setLegendData] = useState([]); // State to hold legend data


    useEffect(() => {

        // If no data
        if (!data || !Array.isArray(data) || data.length === 0) {
            setIsEmpty(true); // Set the isEmpty state to true if no data is available
            return; // Exit the useEffect hook early
        } else {
            setIsEmpty(false); // Ensure isEmpty is false when there is data
        }

        // Reference to canvas element in DOM (i.e. attach the canvasRef to <canvas>)
        const canvas = canvasRef.current;

        // Render 2D context
        if (canvas && canvas.parentNode) {

            // Pie chart colors
            const colors = [
                'rgb(255, 96, 6)', // Primary Orange
                'darkgrey', // Darkgrey
                '#d35400', // Secondary Orange
                'black', // Black
                'darkorange', // Darkorange
                '#333', // Dark
            ];

            // Get the canvas parent and the computed style for sizing
            const parent = canvas.parentNode;
            const parentComputedStyle = window.getComputedStyle(parent);
            const parentWidth = parseFloat(parentComputedStyle.width);
            const parentPadding = parseFloat(parentComputedStyle.paddingLeft) + parseFloat(parentComputedStyle.paddingRight);

            // 350px or less to fit within padding
            const size = Math.min(parentWidth - parentPadding, 350);
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;

            // Adjust the drawing buffer size
            const scale = window.devicePixelRatio;
            canvas.width = size * scale;
            canvas.height = size * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);

            // Process data only if it's not empty
            const distribution = data.reduce((acc, contact) => {
                // Handle contacts without a 'contactType'
                const type = contact.contactType || 'Unknown';
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});

            // Create the data for the chart
            const chartData = Object.keys(distribution).map((key, index) => ({
                // Slice to show only partial text for category that is too long
                label: `${key.slice(0, 11)}: ${distribution[key]}`,
                value: distribution[key],
                color: colors[index % colors.length],
            }));

            // Set the legend data
            setLegendData(chartData.map(item => ({ label: item.label, color: item.color })));

            // Call method to draw chart with given context, chart data, and size
            drawChart(ctx, chartData, size);
        }
    }, [data]); // Depend on data to re-run effect when it changes

    return (
        <div>
            {/* If there is no contact data, then display a message instead */}
            {isEmpty ? (
                <div className="no-data-warning">No data available!</div>
            ) : (
                <>
                    {/* Display Pie Chart & Legend */}
                    <canvas className="contacts-metrics-pie-chart" ref={canvasRef} />
                    <div className="contacts-metrics-pie-chart-legend">
                        {legendData.map((item, index) => (
                            <div key={index} className="contacts-metrics-pie-chart-legend-item">
                                <span className="contacts-metrics-pie-chart-legend-color" style={{ backgroundColor: item.color }}></span>
                                <span className="contacts-metrics-pie-chart-legend-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </>

            )}
        </div>
    );
};

export default ContactsMetricsPieChart;