import { FaLaptopCode } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100vw",
        position: "relative",
        bottom: -50,
        left: -90,
        marginTop: "auto",
        // background: "linear-gradient(to top, #1e1e1e, #2c2c2c)",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        fontFamily: "'Press Start 2P', cursive",
        borderTop: "3px dashed #aeeaff",
      }}
    >
      {/* Bird icon */}
      <img
        src="/bird.png"
        alt="Flappy Bird"
        style={{
          width: "40px",
          marginBottom: "10px",
          animation: "float 2s ease-in-out infinite",
        }}
      />

      {/* Developer section */}
      <div style={{  }}>
      <div style={{ marginBottom: "10px", fontSize: "0.75rem",backgroundColor:"#000", display:"inline"
      }}>
        <FaLaptopCode style={{ marginRight: "8px", color: "#aeeaff",backgroundColor:"#000", display:"inline" }} />
        Meet the Developers
      </div>

      {/* GitHub links */}
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <a
          href="https://github.com/ishitars27"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#aeeaff", transition: "color 0.3s",backgroundColor:"#000", display:"inline" }}
        >
          <TbBrandGithubFilled size={24} />
        </a>
        <a
          href="https://github.com/ayeshashaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#aeeaff", transition: "color 0.3s",backgroundColor:"#000", display:"inline" }}
        >
          <TbBrandGithubFilled size={24} />
        </a>
      </div>
      </div>

      {/* Keyframes for bird float */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
