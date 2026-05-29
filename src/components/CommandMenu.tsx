import React, { useEffect, useState, useRef } from "react";
import "./styles/CommandMenu.css";

const CommandMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Toggle on Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            // Close on Escape
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const actions = [
        {
            id: "resume",
            title: "📄 Download Resume",
            desc: "Get a copy of my latest CV",
            action: () => {
                alert("Resume download feature will map to your PDF file here!");
                setIsOpen(false);
            },
        },
        {
            id: "github",
            title: "💻 View GitHub",
            desc: "Check out my open-source repos",
            action: () => {
                window.open("https://github.com/", "_blank");
                setIsOpen(false);
            },
        },
        {
            id: "email",
            title: "📧 Send Email",
            desc: "Reach out to me directly",
            action: () => {
                window.location.href = "mailto:connect@kshitij19ji.com";
                setIsOpen(false);
            },
        },
        {
            id: "projects",
            title: "🚀 View Projects",
            desc: "Scroll to my featured work",
            action: () => {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
            },
        },
    ];

    const filteredActions = actions.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="cmd-overlay" onClick={() => setIsOpen(false)}>
            <div
                className="cmd-palette"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="cmd-header">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="cmd-badge">ESC to close</div>
                </div>

                <div className="cmd-list">
                    <div className="cmd-group-title">Quick Actions</div>
                    {filteredActions.length > 0 ? (
                        filteredActions.map((action, i) => (
                            <div
                                key={action.id}
                                className="cmd-item"
                                onClick={action.action}
                            >
                                <div className="cmd-item-info">
                                    <h4>{action.title}</h4>
                                    <p>{action.desc}</p>
                                </div>
                                <div className="cmd-item-enter">↵</div>
                            </div>
                        ))
                    ) : (
                        <div className="cmd-empty">No results found for "{search}"</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandMenu;
