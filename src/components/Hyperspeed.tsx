import "./Hyperspeed.css";

const Hyperspeed = () => {

  return <div id="Lights">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.8 }}
    >
      <source src="/final.mp4" type="video/mp4" />
    </video>
  </div>;
};

export default Hyperspeed;
