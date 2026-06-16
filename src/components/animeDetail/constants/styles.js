export const customStyles = `
  .dotted-bg {
    background-image: radial-gradient(#ff1e56 0.7px, transparent 0.7px);
    background-size: 24px 24px;
    opacity: 0.04;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #0d0508;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ff1e56;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cc0033;
  }
  @keyframes pulse-glow {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  .glow-pulse {
    animation: pulse-glow 3s infinite ease-in-out;
  }
`;