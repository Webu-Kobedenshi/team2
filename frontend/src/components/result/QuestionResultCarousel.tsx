import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";

import type { QuestionResult } from "../../features/resultAnalysis";
import type { PlayerProfile } from "./playerProfiles";
import { QuestionResultSlide } from "./QuestionResultSlide";

const minimumSwipeDistance = 24;
const dragStartThreshold = 6;
const edgeResistance = 0.25;

type DragDirection = "pending" | "horizontal" | "vertical";

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  direction: DragDirection;
};

type QuestionResultCarouselProps = {
  questionResults: QuestionResult[];
  playerDisplayOrder: number[];
  getPlayerProfile: (playerIndex: number) => PlayerProfile;
  activeSlideIndex: number;
  onActiveSlideChange: (slideIndex: number) => void;
};

export function QuestionResultCarousel({
  questionResults,
  playerDisplayOrder,
  getPlayerProfile,
  activeSlideIndex,
  onActiveSlideChange,
}: QuestionResultCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const dragState = useRef<DragState | null>(null);
  const dragOffsetRef = useRef(0);
  const [carouselHeight, setCarouselHeight] = useState<number>();
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastSlideIndex = questionResults.length - 1;
  const isLastSlide = activeSlideIndex === lastSlideIndex;

  useLayoutEffect(() => {
    const activeSlide = slideRefs.current[activeSlideIndex];

    if (!activeSlide) return;

    const updateCarouselHeight = () => {
      setCarouselHeight(activeSlide.getBoundingClientRect().height);
    };

    updateCarouselHeight();

    const resizeObserver = new ResizeObserver(updateCarouselHeight);
    resizeObserver.observe(activeSlide);

    return () => resizeObserver.disconnect();
  }, [activeSlideIndex]);

  function moveToSlide(slideIndex: number) {
    onActiveSlideChange(Math.min(Math.max(slideIndex, 0), lastSlideIndex));
  }

  function updateDragOffset(nextDragOffset: number) {
    dragOffsetRef.current = nextDragOffset;
    setDragOffset(nextDragOffset);
  }

  function resetDrag() {
    dragState.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      direction: "pending",
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const currentDragState = dragState.current;

    if (
      !currentDragState ||
      currentDragState.pointerId !== event.pointerId ||
      currentDragState.direction === "vertical"
    ) {
      return;
    }

    const horizontalDistance = event.clientX - currentDragState.startX;
    const verticalDistance = event.clientY - currentDragState.startY;

    if (currentDragState.direction === "pending") {
      if (
        Math.abs(horizontalDistance) < dragStartThreshold &&
        Math.abs(verticalDistance) < dragStartThreshold
      ) {
        return;
      }

      currentDragState.direction =
        Math.abs(horizontalDistance) > Math.abs(verticalDistance)
          ? "horizontal"
          : "vertical";

      if (currentDragState.direction === "vertical") return;

      setIsDragging(true);
    }

    event.preventDefault();

    const carouselWidth = carouselRef.current?.clientWidth ?? 0;
    const isDraggingPastFirstSlide =
      activeSlideIndex === 0 && horizontalDistance > 0;
    const isDraggingPastLastSlide =
      activeSlideIndex === lastSlideIndex && horizontalDistance < 0;
    const resistedDistance =
      isDraggingPastFirstSlide || isDraggingPastLastSlide
        ? horizontalDistance * edgeResistance
        : horizontalDistance;
    const maximumDragDistance =
      (isDraggingPastFirstSlide || isDraggingPastLastSlide
        ? carouselWidth * edgeResistance
        : carouselWidth) || Math.abs(resistedDistance);
    const nextDragOffset = Math.min(
      Math.max(resistedDistance, -maximumDragDistance),
      maximumDragDistance,
    );

    updateDragOffset(nextDragOffset);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>, canceled = false) {
    const currentDragState = dragState.current;

    if (!currentDragState || currentDragState.pointerId !== event.pointerId) {
      return;
    }

    const completedDragOffset = dragOffsetRef.current;
    const shouldMoveSlide =
      !canceled &&
      currentDragState.direction === "horizontal" &&
      Math.abs(completedDragOffset) >= minimumSwipeDistance;

    resetDrag();

    if (shouldMoveSlide) {
      moveToSlide(activeSlideIndex + (completedDragOffset < 0 ? 1 : -1));
    }
  }

  return (
    <>
      <div
        ref={carouselRef}
        aria-label="質問ごとの回答結果"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishDrag(event)}
        onPointerCancel={(event) => finishDrag(event, true)}
        className={`touch-pan-y overflow-hidden transition-[height] duration-300 ease-out select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={
          carouselHeight === undefined
            ? undefined
            : { height: `${carouselHeight}px` }
        }
      >
        <div
          className={`flex items-start ${
            isDragging
              ? "transition-none"
              : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `translate3d(calc(-${activeSlideIndex * 100}% + ${dragOffset}px), 0, 0)`,
          }}
        >
          {questionResults.map((questionResult, questionIndex) => (
            <section
              key={questionResult.questionId}
              ref={(element) => {
                slideRefs.current[questionIndex] = element;
              }}
              aria-hidden={questionIndex !== activeSlideIndex}
              aria-label={`質問${questionIndex + 1}の結果`}
              className="w-full shrink-0 px-2"
            >
              <QuestionResultSlide
                questionResult={questionResult}
                questionNumber={questionIndex + 1}
                questionCount={questionResults.length}
                playerDisplayOrder={playerDisplayOrder}
                getPlayerProfile={getPlayerProfile}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="前の質問へ"
            disabled={activeSlideIndex === 0}
            onClick={() => moveToSlide(activeSlideIndex - 1)}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-sky-200 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <p aria-live="polite" className="text-sm font-black text-slate-600">
            {activeSlideIndex + 1} / {questionResults.length}
          </p>

          <button
            type="button"
            aria-label="次の質問へ"
            disabled={isLastSlide}
            onClick={() => moveToSlide(activeSlideIndex + 1)}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-sky-200 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p className="text-center text-xs font-bold text-slate-400">
          左右にスワイプして切り替え
        </p>
      </div>
    </>
  );
}
