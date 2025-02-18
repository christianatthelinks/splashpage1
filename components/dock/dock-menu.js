const { useRef, useEffect, useState } = window.React;

const dock_data = [
  {
    id: 1,
    icon: "https://www.frontend.fyi/playground-assets/macos-dock/icons/arc.png",
    tooltip: "First",
    title: "First Title",
    description: (
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Pain</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Impact</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Reasons to Believe</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Instead of</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    icon: "https://www.frontend.fyi/playground-assets/macos-dock/icons/1password.png",
    tooltip: "Second",
    title: "Second Title",
    description: (
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Pain</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Impact</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Reasons to Believe</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Instead of</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    icon: "https://www.frontend.fyi/playground-assets/macos-dock/icons/calendar.png",
    tooltip: "Third",
    title: "Third Title",
    description: (
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Pain</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Impact</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Reasons to Believe</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Instead of</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    icon: "https://www.frontend.fyi/playground-assets/macos-dock/icons/email.png",
    tooltip: "Fourth",
    title: "Fourth Title",
    description: (
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Pain</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Impact</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Reasons to Believe</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Instead of</h1>
          <p>
            Finance teams in SaaS companies struggle with complex contracts,
            pricing errors, and meeting ASC 606/IFRS 15 standards, causing
            billing and revenue recognition headaches.
          </p>
        </div>
      </div>
    ),
  },
];

const maxAdditionalSize = 5;

const ModalDetail = ({ open, setOpen, content }) => {
  if (!open) return null; // Don't render the modal if it's not open
  React.useEffect(() => {
    lucide.createIcons();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <dialog
        open={open}
        className="p-6 bg-white rounded-lg shadow-lg mx-auto flex flex-col justify-between gap-4 border! border-black/30! text-black max-w-[600px]"
      >
        <h1 className="text-2xl font-bold">{content.title}</h1>
        {content.description}
        <div className="bg-white border! border-black/40 shadow-sm absolute -top-4 -right-4 rounded-full size-8 flex items-center justify-center cursor-pointer" onClick={() => setOpen(false)}>
          <i
            data-lucide="x"
            className="size-6"
            fill="orange"
            stroke="red"
          ></i>
        </div>
      </dialog>
    </div>
  );
};

const DockMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalDetail, setModalDetail] = useState({
    title: "",
    description: "",
  });

  const dockRef = useRef(null);

  const scaleValue = (value, from, to) => {
    const scale = (to[1] - to[0]) / (from[1] - from[0]);
    const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return Math.floor(capped * scale + to[0]);
  };

  const handleAppHover = (ev) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };

  const handleOnOpenDetail = ({ title, description }) => {
    setOpenModal(true);
    setModalDetail({ title, description });
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <>
      <div className="page">
        <nav ref={dockRef} className="dock">
          <ul>
            {dock_data.map((item) => (
              <li
                key={item.id}
                className="app"
                onMouseMove={handleAppHover}
                onClick={() =>
                  handleOnOpenDetail({
                    title: item.title,
                    description: item.description,
                  })
                }
              >
                <img src={item.icon} />
                <span className="tooltip">{item.tooltip}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ModalDetail
        open={openModal}
        setOpen={setOpenModal}
        content={modalDetail}
      />
    </>
  );
};

const content = document.getElementById("dock-menu");
const root = ReactDOM.createRoot(content);
root.render(<DockMenu />);
