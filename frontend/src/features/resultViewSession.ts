const RESULT_VIEW_STORAGE_KEY = "commonFinderResultView";

export function loadResultQuestionIndex(questionCount: number): number {
  const rawQuestionIndex = sessionStorage.getItem(RESULT_VIEW_STORAGE_KEY);

  if (rawQuestionIndex === null) {
    return 0;
  }

  const questionIndex = Number(rawQuestionIndex);

  if (!Number.isInteger(questionIndex)) {
    return 0;
  }

  return Math.min(Math.max(questionIndex, 0), questionCount - 1);
}

export function saveResultQuestionIndex(questionIndex: number) {
  sessionStorage.setItem(RESULT_VIEW_STORAGE_KEY, String(questionIndex));
}

export function clearResultViewSession() {
  sessionStorage.removeItem(RESULT_VIEW_STORAGE_KEY);
}
