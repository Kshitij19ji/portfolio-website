import React, { useState, useEffect, useRef } from 'react';
import './styles/TerminalWidget.css';

const TerminalWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<{ type: string; text: string | React.ReactNode }[]>([
        { type: 'system', text: 'Welcome to Kshitij_OS v1.0. Type "help" for a list of available commands.' }
    ]);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [output, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        // Add command to output
        setOutput((prev) => [...prev, { type: 'command', text: `> ${input}` }]);

        // Process command
        if (cmd === 'help') {
            setOutput((prev) => [...prev,
            { type: 'info', text: 'Commands:' },
            { type: 'info', text: '  resume   - Download my latest CV' },
            { type: 'info', text: '  skills   - List my technical stack' },
            { type: 'info', text: '  contact  - Show my email address' },
            { type: 'info', text: '  clear    - Clear terminal output' }
            ]);
        } else if (cmd === 'resume') {
            setOutput((prev) => [...prev, { type: 'success', text: 'Initializing download... Kshitij_Resume.pdf' }]);
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Kshitij_Resume.pdf';
                link.click();
            }, 500);
        } else if (cmd === 'skills') {
            setOutput((prev) => [...prev,
            { type: 'success', text: 'Accessing core neural network...' },
            { type: 'info', text: 'Core: Python, PyTorch, C++, HTML, SQL' },
            { type: 'info', text: 'Database: MySQL, Firebase' },
            { type: 'info', text: 'Frameworks: React, Next.js, Node.js, Flask' },
            { type: 'info', text: 'Soft Skills: Problem Solving, AI Empathy' }
            ]);
        } else if (cmd === 'contact') {
            setOutput((prev) => [...prev,
            { type: 'info', text: 'Email: kshitijsinha261@gmail.com' },
            { type: 'info', text: 'Initiating email client...' }
            ]);
            setTimeout(() => {
                window.location.href = 'mailto:kshitijsinha261@gmail.com';
            }, 800);
        } else if (cmd === 'clear') {
            setOutput([{ type: 'system', text: 'Welcome to Kshitij_OS v1.0. Type "help" for a list of available commands.' }]);
        } else if (cmd !== '') {
            setOutput((prev) => [...prev, { type: 'error', text: `Command not found: ${cmd}. Type "help" for options.` }]);
        }

        setInput('');
    };

    return (
        <>
            <button className="terminal-toggle-btn magnetic" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '>_'}
            </button>

            <div className={`terminal-widget ${isOpen ? 'open' : ''}`}>
                <div className="terminal-header">
                    <span className="terminal-title">kshitij@portfolio: ~</span>
                    <div className="terminal-controls">
                        <span className="terminal-ctrl minimize" onClick={() => setIsOpen(false)}></span>
                        <span className="terminal-ctrl maximize"></span>
                        <span className="terminal-ctrl close" onClick={() => setIsOpen(false)}></span>
                    </div>
                </div>

                <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
                    {output.map((line, i) => (
                        <div key={i} className={`terminal-line ${line.type}`}>
                            {line.text}
                        </div>
                    ))}
                    <div ref={endRef} />

                    <form onSubmit={handleCommand} className="terminal-input-line">
                        <span className="terminal-prompt">kshitij@home:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoComplete="off"
                            spellCheck="false"
                            className="terminal-input"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default TerminalWidget;
