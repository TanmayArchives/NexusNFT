export const storeContentId = (contentId: string) => {
  const contentIds = JSON.parse(localStorage.getItem('contentIds') || '[]');
  contentIds.push(contentId);
  localStorage.setItem('contentIds', JSON.stringify(contentIds));
};

export const getContentIds = (): string[] => {
  return JSON.parse(localStorage.getItem('contentIds') || '[]');
};
