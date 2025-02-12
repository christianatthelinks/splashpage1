const { useState, useEffect, useRef, useId, forwardRef, Fragment } = window.React;

const Box = forwardRef(({ children, right }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-50 flex p-2! items-center justify-center rounded-lg border-2 bg-white shadow-md text-xs font-semibold md:w-[230px] md:text-[16px] ${right ? "w-[100px]" : ""}`}
    >
      {children}
    </div>
  );
});

Box.displayName = "Box";

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 2,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  bubbleCount = 2, // Number of bubbles
}) => {
  const id = React.useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const startX = rectA.left - containerRect.left + rectA.width / 2;
      const startY = rectA.top - containerRect.top + rectA.height / 2;
      const endX = rectB.left - containerRect.left + rectB.width / 2;
      const endY = rectB.top - containerRect.top + rectB.height / 2;

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${
        (startX + endX) / 2
      },${controlY} ${endX},${endY}`;
      setPathD(d);
    };

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    updatePath();

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  // Generate different colors and sizes for each bubble
  const bubbles = Array.from({ length: bubbleCount }).map((_, index) => ({
    size: Math.random() * 2 + 5, // Radius between 4px to 10px
    color: `hsl(${Math.random() * 360}, 80%, 60%)`, // Random bright color
    duration: duration + Math.random() * 1.5, // Slightly different duration per bubble
    delay: Math.random() * duration, // Random delay
  }));

  return (
    <svg
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="absolute left-0 top-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Static path */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
        strokeLinecap="round"
      />

      {/* Animated stroke */}
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10,5"
        strokeDashoffset="50"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="50"
          to="0"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>

      {/* Multiple Moving Bubbles with Different Sizes & Colors */}
      {bubbles.map((bubble, index) => (
        <circle key={index} r={bubble.size} fill={bubble.color} opacity="1">
          <animateMotion
            dur={`${bubble.duration}s`}
            repeatCount="indefinite"
            begin={`${bubble.delay}s`} // Random delay per bubble
            keyPoints="0;0.5;1"
            keyTimes="0;0.5;1"
          >
            <mpath href={`#animated-path-${id}`} />
          </animateMotion>
        </circle>
      ))}

      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} />
          <stop offset="75%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Invisible Path for Motion */}
      <path id={`animated-path-${id}`} d={pathD} fill="none" stroke="transparent" />
    </svg>
  );
};

const AnimatedBeamDemo = () => {
  const containerRef = React.useRef(null);
  const left1 = React.useRef(null);
  const left2 = React.useRef(null);
  const left3 = React.useRef(null);
  const left4 = React.useRef(null);
  const left5 = React.useRef(null);
  const left6 = React.useRef(null);
  const left7 = React.useRef(null);
  const left8 = React.useRef(null);

  const center = React.useRef(null);

  const right1 = React.useRef(null);
  const right2 = React.useRef(null);
  const right3 = React.useRef(null);
  const right4 = React.useRef(null);
  const right5 = React.useRef(null);

  React.useEffect(() => {
    lucide.createIcons();
  },[])

  return (
    <div className="relative w-full md:w-[95%] my-10!" ref={containerRef}>
      <div className="hidden md:flex absolute top-[20%] left-[35%] w-16 h-16 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-10 h-10" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="hidden md:flex absolute top-[45%] left-[35%] w-12 h-12 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-6 h-6" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="hidden md:flex absolute top-[60%] left-[38%] w-14 h-14 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-8 h-8" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="hidden md:flex absolute top-[20%] right-[35%] w-16 h-16 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-10 h-10" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="hidden md:flex absolute top-[45%] right-[35%] w-12 h-12 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-6 h-6" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="hidden md:flex absolute top-[60%] right-[38%] w-14 h-14 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! bg-white/80 rounded-full!">
          <i data-lucide="settings" className="w-8 h-8" fill="orange" stroke="white"></i> 
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-4">
          <Box ref={left1}>
            <div className="w-full flex items-center justify-between">
              <p>SaaS Contract</p>
              <i data-lucide="receipt-text" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left2}>
            <div className="w-full flex items-center justify-between">
              <p>Insurance Policy</p>
              <i data-lucide="shield-check" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left3}>
            <div className="w-full flex items-center justify-between">
              <p>Point Of Sales</p>
              <i data-lucide="siren" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left4}>
            <div className="w-full flex items-center justify-between">
              <p>Loans & Mortgages</p>
              <i data-lucide="newspaper" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left5}>
            <div className="w-full flex items-center justify-between">
              <p>Supply Chain Logistics</p>
              <i data-lucide="forklift" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left6}>
            <div className="w-full flex items-center justify-between">
              <p>Telcom Billing</p>
              <i data-lucide="receipt" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left7}>
            <div className="w-full flex items-center justify-between">
              <p>Healthcare Claims</p>
              <i data-lucide="heart-handshake" className="w-4 h-4"></i> 
            </div>
          </Box>
          <Box ref={left8}>
            <div className="w-full flex items-center justify-between">
              <p>E-commerce</p>
              <i data-lucide="shopping-basket" className="w-4 h-4"></i> 
            </div>
          </Box>
        </div>
        <Box ref={center}>
          <div className="flex flex-col md:flex-row gap-1 items-center text-xs md:text-xl">
            <h1>Financial</h1>
            <p className="p-4 bg-black text-white px-3! py-1! rounded-md font-bold">Links</p>
          </div>
        </Box>
        <div className="flex flex-col gap-4">
          <Box ref={right1} right={true}>
            <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
              <img src="public/oracle.svg" alt="oracle" draggable={false} className="md:scale-200" />
            </div>
          </Box>
          <Box ref={right2}>
            <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
              <img src="public/oracle-netsuit.png" alt="oracle-netsuit" draggable={false} className="md:scale-200"  />
            </div>
          </Box>
          <Box ref={right3}>
            <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
              <img src="public/workday.png" alt="workday" draggable={false} className="md:scale-250" />
            </div>
          </Box>
          <Box ref={right4}>
            <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
              <img src="public/quickbook.png" alt="quickbook" draggable={false} className="md:scale-250" />
            </div>
          </Box>
          <Box ref={right5}>
            <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
              <img src="public/xero.png" alt="xero" draggable={false} />
            </div>
          </Box>
        </div>
      </div>
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left1}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left2}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left3}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left4}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left5}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left6}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left7}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left8}
        toRef={center}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right1}
        curvature={140}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right2}
        curvature={80}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right3}
        curvature={2}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right4}
        curvature={-80}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right5}
        curvature={-140}
      />
    </div>
  );
};

const content = document.querySelector(".home-hero-image");
const root = ReactDOM.createRoot(content);
root.render(<AnimatedBeamDemo />);
