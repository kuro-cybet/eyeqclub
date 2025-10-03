const MarqueeBanner = () => {
  const content = "🎉 Registration Open! Join EYEQ Club Today • 🚀 Workshop on AI/ML Coming Soon • ⏰ Hackathon Registration Deadline: Oct 15 • 🌟 Be Part of the Revolution";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-secondary to-primary h-12 overflow-hidden">
      <div className="flex items-center h-full">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="text-background font-bold text-sm px-4">{content}</span>
          <span className="text-background font-bold text-sm px-4">{content}</span>
          <span className="text-background font-bold text-sm px-4">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
