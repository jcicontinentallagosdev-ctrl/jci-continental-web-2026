import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { cn } from '@/lib/utils';

const words = [
  {
    id: 1,
    word: 'Empowering',
    color: 'yellow' as const,
    rotation: '-1deg',
    position: 'left' as const,
    order: 1,
    zIndex: 1,
  },
  {
    id: 2,
    word: 'Innovative',
    color: 'blue' as const,
    rotation: '2deg',
    position: 'left' as const,
    order: 2,
    zIndex: 2,
  },
  {
    id: 3,
    word: 'Dynamic',
    color: 'yellow' as const,
    rotation: '1deg',
    position: 'left' as const,
    order: 3,
    zIndex: 3,
  },
  {
    id: 4,
    word: 'Inclusive',
    color: 'blue' as const,
    rotation: '-1deg',
    position: 'right' as const,
    order: 1,
    zIndex: 2,
  },
  {
    id: 5,
    word: 'Diverse',
    color: 'yellow' as const,
    rotation: '2deg',
    position: 'right' as const,
    order: 2,
    zIndex: 3,
  },
  {
    id: 6,
    word: 'Borderless',
    color: 'blue' as const,
    rotation: '1deg',
    position: 'right' as const,
    order: 3,
    zIndex: 4,
  },
];

const leftColumn = words.filter(w => w.position === 'left');
const rightColumn = words.filter(w => w.position === 'right');

/** Per-row overlap (visual tuck between columns); scales with viewport */
const rowOverlap = [
  {
    towardCenter: '-mr-[clamp(0.75rem,4vw,1.75rem)] sm:-mr-6',
    fromCenter: '-ml-[clamp(0.75rem,4vw,1.75rem)] sm:-ml-6',
  },
  {
    towardCenter: '-mr-[clamp(0.85rem,4.5vw,1.85rem)] sm:-mr-7',
    fromCenter: '-ml-[clamp(0.85rem,4.5vw,1.85rem)] sm:-ml-7',
  },
  {
    towardCenter: '-mr-[clamp(1rem,5vw,2.25rem)] sm:-mr-9',
    fromCenter: '-ml-[clamp(1rem,5vw,2.25rem)] sm:-ml-9',
  },
] as const;

type WordTileProps = {
  word: string;
  color: 'yellow' | 'blue';
  rotation: string;
  className?: string;
  textClassName?: string;
};

function WordTile({
  word: label,
  color,
  rotation,
  className,
  textClassName,
}: WordTileProps) {
  const isYellow = color === 'yellow';

  return (
    <div
      className={cn(
        'transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1',
        className,
      )}
    >
      <div
        className="origin-center"
        style={{ transform: `rotate(${rotation})` }}
      >
        <div
          className={cn(
            'flex min-h-[88px] items-center justify-center rounded-xl border-[2.5px] px-3 py-4 sm:min-h-[96px] sm:rounded-2xl sm:border-[3px] sm:px-5 sm:py-6 lg:min-h-[105px] lg:px-6 lg:py-7',
            'transition-shadow duration-300 ease-out',
            'shadow-[0_4px_6px_-1px_rgb(0_19_25_/_0.06),0_18px_36px_-14px_rgb(0_19_25_/_0.22)]',
            'hover:shadow-[0_8px_12px_-2px_rgb(0_19_25_/_0.08),0_28px_48px_-16px_rgb(0_19_25_/_0.28)]',
            isYellow
              ? 'border-[#a2882b] bg-[#e4c03d] text-[#60511a]'
              : 'border-[#8bd0e6] bg-[#0398c8] text-[#feffff]',
          )}
        >
          <span
            className={cn(
              'text-center font-medium tracking-tight',
              textClassName,
            )}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WordsThatDescribeUs() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F7EBC3] py-10 sm:py-12 md:py-16 lg:py-24">
      {/* Background: pattern + soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.22]"
        style={{
          backgroundImage: `url(${images.wordsThatDescribeUsImage.src})`,
          transform: 'translateY(-34px)',
          minHeight: '100%',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F7EBC3]/40 via-transparent to-[#F7EBC3]/90"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center justify-start gap-10 lg:gap-12">
          {/* Header: centered underline below lg; fixed art position at lg+ */}
          <div className="relative flex w-full max-w-[min(100%,38rem)] flex-col items-center gap-3 px-1 sm:max-w-[620px]">
            <div className="absolute left-1/2 top-[clamp(4.25rem,18vw,5.75rem)] z-0 h-[7.887px] w-[min(168px,54vw)] -translate-x-1/2 lg:hidden">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>
            <div className="absolute left-[212px] top-[30.5px] z-0 hidden h-3 w-[248px] lg:block">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            <h2 className="relative z-20 text-center text-[clamp(1.25rem,4.2vw,2.25rem)] font-bold leading-tight tracking-tight text-balance text-[#001319] lg:text-4xl lg:leading-[1.15]">
              Words That Describes Us
            </h2>
          </div>

          {/* Desktop — wide enough for fixed art direction */}
          <div className="hidden w-full items-center justify-center py-0 pl-0 pr-[51px] lg:flex">
            <div className="relative mr-[-51px] h-[408.501px] w-[424px]">
              {leftColumn.map(word => (
                <div
                  key={word.id}
                  className="absolute flex h-[112.384px] w-[425.768px] items-center justify-center"
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
                  <WordTile
                    word={word.word}
                    color={word.color}
                    rotation={word.rotation}
                    className="w-full max-w-[424px]"
                    textClassName="text-3xl leading-9 xl:text-4xl xl:leading-10"
                  />
                </div>
              ))}
            </div>

            <div className="relative mr-[-51px] flex w-[424px] flex-col items-start justify-start gap-8">
              {rightColumn.map(word => (
                <div
                  key={word.id}
                  className="relative flex w-full items-center justify-center"
                  style={{
                    height:
                      word.order === 1 || word.order === 3
                        ? 'calc(1px * ((424 * 0.017452405765652657) + (105 * 0.9998477101325989)))'
                        : 'calc(1px * ((424 * 0.03489949554204941) + (105 * 0.9993907809257507)))',
                    zIndex: word.zIndex,
                  }}
                >
                  <WordTile
                    word={word.word}
                    color={word.color}
                    rotation={word.rotation}
                    className="w-full"
                    textClassName="text-3xl leading-9 xl:text-4xl xl:leading-10"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet & mobile: equal columns, fluid type, symmetric overlap */}
          <div className="mx-auto flex w-full max-w-[min(100%,36rem)] flex-col items-stretch gap-5 sm:max-w-xl sm:gap-6 md:max-w-3xl md:gap-8 lg:hidden">
            {[0, 1, 2].map(row => {
              const left = leftColumn[row];
              const right = rightColumn[row];
              return (
                <div
                  key={left.id}
                  className="flex w-full items-stretch justify-center gap-0 px-0.5 sm:px-2"
                >
                  <div
                    className={cn(
                      'relative z-[1] flex min-h-0 min-w-0 flex-1 justify-end',
                      rowOverlap[row].towardCenter,
                    )}
                  >
                    <WordTile
                      word={left.word}
                      color={left.color}
                      rotation={left.rotation}
                      className="w-full max-w-[min(100%,11.5rem)] sm:max-w-[13.25rem] md:max-w-[15rem]"
                      textClassName="text-[clamp(1rem,3.6vw,1.25rem)] font-medium leading-snug sm:text-xl sm:leading-8 md:text-2xl md:leading-10"
                    />
                  </div>
                  <div
                    className={cn(
                      'relative z-[2] flex min-h-0 min-w-0 flex-1 justify-start',
                      rowOverlap[row].fromCenter,
                    )}
                  >
                    <WordTile
                      word={right.word}
                      color={right.color}
                      rotation={right.rotation}
                      className="w-full max-w-[min(100%,11.5rem)] sm:max-w-[13.25rem] md:max-w-[15rem]"
                      textClassName="text-[clamp(1rem,3.6vw,1.25rem)] font-medium leading-snug sm:text-xl sm:leading-8 md:text-2xl md:leading-10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
