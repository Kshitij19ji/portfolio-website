import "./styles/Marquee.css";

const Marquee = () => {
    const items = [
        { text: "GPS-Denied Drone Navigation", color: "#ff595e", bg: "rgba(255, 89, 94, 0.15)" },
        { text: "Research based IIT Bhilai", color: "#ffca3a", bg: "rgba(255, 202, 58, 0.15)" },
        { text: "AI Based Sketch-to-UI", color: "#8ac926", bg: "rgba(138, 201, 38, 0.15)" },
        { text: "Inventory Management System", color: "#1982c4", bg: "rgba(25, 130, 196, 0.15)" },
        { text: "Subject Matter Expert @ Chegg", color: "#6a4c93", bg: "rgba(106, 76, 147, 0.15)" },
        { text: "NIT Raipur Hackathon Finalist", color: "#f15bb5", bg: "rgba(241, 91, 181, 0.15)" },
        { text: "2nd Place CSVTU National Science Day", color: "#00bbf9", bg: "rgba(0, 187, 249, 0.15)" },
        { text: "Gen AI Study Jam @ Univ. of Calcutta", color: "#00f5d4", bg: "rgba(0, 245, 212, 0.15)" },
        { text: "Gen AI Study Jam @ Rungta", color: "#ff595e", bg: "rgba(255, 89, 94, 0.15)" },
        { text: "GitHub Dev Days Participant", color: "#ffca3a", bg: "rgba(255, 202, 58, 0.15)" },
        { text: "HackJNU 4.0 AI Empathy System", color: "#8ac926", bg: "rgba(138, 201, 38, 0.15)" },
        { text: "3rd Place NSS Awareness Program", color: "#1982c4", bg: "rgba(25, 130, 196, 0.15)" },
        { text: "NSS 7-Day Unit Camps", color: "#6a4c93", bg: "rgba(106, 76, 147, 0.15)" }
    ];

    const content = items.map((item, index) => (
        <div
            key={index}
            className="marquee-item"
            style={{
                color: item.color,
                backgroundColor: item.bg,
                border: `1px solid ${item.color}`
            }}
        >
            {item.text}
        </div>
    ));

    return (
        <div className="marquee-container section-container">
            <div className="marquee-view">
                <div className="marquee-content">{content}</div>
                <div className="marquee-content">{content}</div>
            </div>
        </div>
    );
};

export default Marquee;
