const { useState, useEffect, useRef, useId, forwardRef, Fragment } =
  window.React;

const Box = forwardRef(({ children, right, width = "150px" }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-50 flex p-2! items-center justify-center rounded-lg border-2 bg-[rgb(229,254,88)] text-xs font-semibold md:w-[${width}] md:text-[16px] ${
        right ? "w-[100px]" : ""
      }`}
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
      <path
        id={`animated-path-${id}`}
        d={pathD}
        fill="none"
        stroke="transparent"
      />
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
  const right6 = React.useRef(null);

  React.useEffect(() => {
    lucide.createIcons();
  }, []);

  return (
    <div className="relative w-full md:w-[95%] my-10!" ref={containerRef}>
      <div className="hidden md:flex absolute top-[20%] left-[35%] w-16 h-16 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-10 h-10"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[45%] left-[40%] w-12 h-12 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-6 h-6"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[69%] left-[38%] w-14 h-14 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-8 h-8"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[30%] right-[30%] w-16 h-16 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-10 h-10"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[45%] right-[28%] w-12 h-12 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-6 h-6"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[66%] right-[28%] w-14 h-14 items-center justify-center rounded-full border-4 border-white/30 backdrop-blur-[2px] bg-white/10 shadow-sm animate-spin z-50 text-2xl">
        <div className="p-1! rounded-full!">
          <i
            data-lucide="settings"
            className="w-8 h-8"
            fill="orange"
            stroke="white"
          ></i>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="w-[300px] flex justify-end">
            <p className="font-bold text-[24px]">Industry Applications</p>
          </div>
          <div className="flex-1"></div>
          <div className="w-[210px] flex flex-start">
            <p className="font-bold text-[24px]">General Ledger</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-2 pr-[50px]!">
          <div className="flex flex-col gap-4">
            <Box ref={left1} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">SaaS Contract</p>
                <i
                  data-lucide="receipt-text"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left2} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">Insurance Policy</p>
                <i
                  data-lucide="shield-check"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left3} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">Point Of Sales</p>
                <div className="size-10 relative flex items-center justify-center">
                  <i
                    data-lucide="monitor-smartphone"
                    className="size-12 absolute"
                    strokeWidth={1.0}
                  ></i>
                  <i
                    data-lucide="dollar-sign"
                    className="size-4 top-[8px] left-[8.5px] absolute"
                    strokeWidth={1.6}
                  ></i>
                </div>
              </div>
            </Box>
            <Box ref={left4} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">Loans & Mortgages</p>
                <i
                  data-lucide="newspaper"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left5} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">
                  Supply Chain Logistics
                </p>
                <i
                  data-lucide="forklift"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left6} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">Telcom Billing</p>
                <i
                  data-lucide="receipt"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left7} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">Healthcare Claims</p>
                <i
                  data-lucide="heart-handshake"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
            <Box ref={left8} width={"310px"}>
              <div className="w-full flex items-center justify-end gap-4">
                <p className="text-[22px] font-normal">E-commerce</p>
                <i
                  data-lucide="shopping-basket"
                  className="size-10"
                  strokeWidth={1.0}
                ></i>
              </div>
            </Box>
          </div>
          <div
            ref={center}
            className="flex z-50 flex-col md:flex-col bg-white size-[130px] justify-center gap-1 items-center text-xs md:text-xl rounded-md"
          >
            <h1 className="text-[26px]">financial</h1>
            <div className="bg-black text-white text-[28px] size-[70px] flex justify-center items-center rounded-md">
              links
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Box ref={right1} right={true}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img
                  src="public/oracle.png"
                  alt="oracle"
                  draggable={false}
                  className="md:scale-200"
                />
              </div>
            </Box>
            <Box ref={right2}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img
                  src="public/oracle-netsuit.png"
                  alt="oracle-netsuit"
                  draggable={false}
                  className="md:scale-180"
                />
              </div>
            </Box>
            <Box ref={right3}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img
                  src="public/workday.png"
                  alt="workday"
                  draggable={false}
                  className="md:scale-220"
                />
              </div>
            </Box>
            <Box ref={right4}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img
                  src="public/quickbook.png"
                  alt="quickbook"
                  draggable={false}
                  className="md:scale-220"
                />
              </div>
            </Box>
            <Box ref={right5}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img
                  src="public/sage.webp"
                  alt="sage"
                  draggable={false}
                  className="md:scale-180"
                />
              </div>
            </Box>
            <Box ref={right6}>
              <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center">
                <img src="public/xero.png" alt="xero" draggable={false} />
              </div>
            </Box>
          </div>
        </div>
      </div>
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left1}
        toRef={center}
        curvature={30}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left2}
        toRef={center}
        curvature={20}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left3}
        toRef={center}
        curvature={10}
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
        curvature={-10}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left7}
        toRef={center}
        curvature={-20}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={left8}
        toRef={center}
        curvature={-30}
      />

      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right1}
        curvature={230}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right2}
        curvature={130}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right3}
        curvature={40}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right4}
        curvature={-40}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right5}
        curvature={-130}
      />
      <AnimatedBeam
        duration={1.5}
        containerRef={containerRef}
        fromRef={center}
        toRef={right6}
        curvature={-230}
      />
    </div>
  );
};

const content = document.querySelector(".home-hero-image");
const root = ReactDOM.createRoot(content);
root.render(<AnimatedBeamDemo />);
