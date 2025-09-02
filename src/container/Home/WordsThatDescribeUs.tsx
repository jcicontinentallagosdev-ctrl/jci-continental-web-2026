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
    <section className="bg-[#F7EBC3] relative py-24 overflow-hidden">
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

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 items-center justify-start">
          {/* Header */}
          <div className="flex flex-col gap-3 items-center justify-center w-[620px] relative">
            {/* Decorative vector */}
            <div className="absolute h-3 left-[212px] top-[30.5px] w-[248px]">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            <h2 className="font-bold relative z-20 text-[#001319] text-[36px] leading-[40px]">
              Words That Describes Us
            </h2>
          </div>

          {/* Words Layout */}
          <div className="flex items-center justify-start pl-0 pr-[51px] py-0">
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
        </div>
      </div>
    </section>
  );
}
