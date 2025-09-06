import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

const words = [
  {
    id: 1,
    word: 'Empowering',
    color: 'yellow',
    rotation: '359deg',
    position: 'left',
    order: 1,
    zIndex: 1,
  },
  {
    id: 2,
    word: 'Innovative',
    color: 'blue',
    rotation: '2deg',
    position: 'left',
    order: 2,
    zIndex: 2,
  },
  {
    id: 3,
    word: 'Fluid',
    color: 'yellow',
    rotation: '1deg',
    position: 'left',
    order: 3,
    zIndex: 3,
  },
  {
    id: 4,
    word: 'Inclusive',
    color: 'blue',
    rotation: '359deg',
    position: 'right',
    order: 1,
    zIndex: 2,
  },
  {
    id: 5,
    word: 'Diverse',
    color: 'yellow',
    rotation: '2deg',
    position: 'right',
    order: 2,
    zIndex: 3,
  },
  {
    id: 6,
    word: 'Boarderless',
    color: 'blue',
    rotation: '1deg',
    position: 'right',
    order: 3,
    zIndex: 4,
  },
];

export function WordsThatDescribeUs() {
  return (
    <section className="bg-[#F7EBC3] relative py-12 lg:py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${images.wordsThatDescribeUsImage.src})`,
          width: '100%',
          height: '855px',
          transform: 'translateY(-34px)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 items-center justify-start">
          {/* Header */}
          <div className="flex flex-col gap-3 items-center justify-center w-full lg:w-[620px] relative">
            {/* Desktop decorative vector */}
            <div className="absolute h-3 left-[212px] top-[30.5px] w-[248px] lg:block hidden">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            {/* Mobile decorative vector */}
            <div className="absolute h-[7.887px] left-[166px] top-[85px] w-[163px] lg:hidden block">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            <h2 className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] text-center">
              Words That Describes Us
            </h2>
          </div>

          {/* Desktop Words Layout - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-start pl-0 pr-[51px] py-0">
            {/* Left Column */}
            <div className="h-[408.501px] mr-[-51px] relative w-[424px]">
              {words
                .filter(word => word.position === 'left')
                .map(word => (
                  <div
                    key={word.id}
                    className="absolute flex h-[112.384px] items-center justify-center w-[425.768px]"
                    style={{
                      top:
                        word.order === 1
                          ? '0'
                          : word.order === 2
                            ? '144.38px'
                            : '296.12px',
                      left:
                        word.order === 1
                          ? '-1px'
                          : word.order === 2
                            ? '-1.7px'
                            : '-0.88px',
                      width: word.order === 2 ? '427.406px' : '425.768px',
                      zIndex: word.zIndex,
                    }}
                  >
                    <div
                      className={`flex-none rotate-[${word.rotation}] transform transition-transform duration-300 hover:scale-105`}
                      style={{
                        transform: `rotate(${word.rotation})`,
                      }}
                    >
                      <div
                        className={`box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-[424px] shadow-lg ${
                          word.color === 'yellow'
                            ? 'bg-[#e4c03d] border-[#a2882b] text-[#60511a]'
                            : 'bg-[#0398c8] border-[#8bd0e6] text-[#feffff]'
                        }`}
                        style={{
                          border: '3px solid',
                          borderColor:
                            word.color === 'yellow' ? '#a2882b' : '#8bd0e6',
                          transform: `rotate(${word.rotation})`,
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[36px] leading-[40px]">
                          {word.word}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8 items-start justify-start mr-[-51px] relative w-[424px]">
              {words
                .filter(word => word.position === 'right')
                .map(word => (
                  <div
                    key={word.id}
                    className="flex items-center justify-center relative w-full"
                    style={{
                      height:
                        word.order === 1 || word.order === 3
                          ? 'calc(1px * ((424 * 0.017452405765652657) + (105 * 0.9998477101325989)))'
                          : 'calc(1px * ((424 * 0.03489949554204941) + (105 * 0.9993907809257507)))',
                      zIndex: word.zIndex,
                    }}
                  >
                    <div
                      className={`flex-none rotate-[${word.rotation}] w-full transform transition-transform duration-300 hover:scale-105`}
                      style={{
                        transform: `rotate(${word.rotation})`,
                      }}
                    >
                      <div
                        className={`box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-full shadow-lg ${
                          word.color === 'yellow'
                            ? 'bg-[#e4c03d] border-[#a2882b] text-[#60511a]'
                            : 'bg-[#0398c8] border-[#8bd0e6] text-[#feffff]'
                        }`}
                        style={{
                          border: '3px solid',
                          borderColor:
                            word.color === 'yellow' ? '#a2882b' : '#8bd0e6',
                          transform: `rotate(${word.rotation})`,
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[36px] leading-[40px]">
                          {word.word}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile Words Layout - Hidden on desktop */}
          <div className="lg:hidden flex flex-col gap-6 items-start justify-start w-full">
            {/* Row 1: Empowering & Inclusive */}
            <div className="flex items-center justify-center pl-0 pr-[25px] py-0 w-full">
              <div className="flex items-center justify-center mr-[-25px] relative">
                <div className="flex-none rotate-[359deg]">
                  <div
                    className="bg-[#e4c03d] box-border flex gap-2 h-[105px] items-center justify-center px-4 py-7 w-[197.331px] shadow-lg"
                    style={{
                      border: '3px solid #a2882b',
                      transform: 'rotate(359deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#60511a] text-[24px] leading-[40px]">
                      Empowering
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mr-[-25px] relative">
                <div className="flex-none rotate-[359deg]">
                  <div
                    className="bg-[#0398c8] box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-[152px] shadow-lg"
                    style={{
                      border: '3px solid #8bd0e6',
                      transform: 'rotate(359deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#feffff] text-[24px] leading-[40px]">
                      Inclusive
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Innovative & Diverse */}
            <div className="flex items-center justify-center pl-0 pr-[29px] py-0 w-full">
              <div className="flex items-center justify-center mr-[-29px] relative">
                <div className="flex-none rotate-[2deg]">
                  <div
                    className="bg-[#0398c8] box-border flex gap-2 h-[105px] items-center justify-center px-4 py-7 w-[181.066px] shadow-lg"
                    style={{
                      border: '3px solid #8bd0e6',
                      transform: 'rotate(2deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#feffff] text-[24px] leading-[40px]">
                      Innovative
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mr-[-29px] relative">
                <div className="flex-none rotate-[2deg]">
                  <div
                    className="bg-[#e4c03d] box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-[168.982px] shadow-lg"
                    style={{
                      border: '3px solid #a2882b',
                      transform: 'rotate(2deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#60511a] text-[24px] leading-[40px]">
                      Diverse
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Fluid & Boarderless */}
            <div className="flex items-center justify-center pl-0 pr-9 py-0 w-full">
              <div className="flex items-center justify-center mr-[-36px] relative">
                <div className="flex-none rotate-[1deg]">
                  <div
                    className="bg-[#e4c03d] box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-[175.556px] shadow-lg"
                    style={{
                      border: '3px solid #a2882b',
                      transform: 'rotate(1deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#60511a] text-[24px] leading-[40px]">
                      Fluid
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mr-[-36px] relative">
                <div className="flex-none rotate-[1deg]">
                  <div
                    className="bg-[#0398c8] box-border flex gap-2 h-[105px] items-center justify-center px-10 py-7 w-[184.451px] shadow-lg"
                    style={{
                      border: '3px solid #8bd0e6',
                      transform: 'rotate(1deg)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="flex flex-col font-['Space_Grotesk'] font-medium justify-center text-[#feffff] text-[24px] leading-[40px]">
                      Boarderless
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
