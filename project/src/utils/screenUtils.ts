import { Screen, ScreenStatus } from '../types';

export const findScreenByNrOrClient = (screens: Screen[], searchTerm: string): Screen[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return screens.filter(
    screen => 
      screen.nrNumber.toLowerCase().includes(lowerSearchTerm) ||
      screen.clientName.toLowerCase().includes(lowerSearchTerm)
  );
};

export const updateScreenStatus = (
  screens: Screen[],
  screenId: string,
  status: ScreenStatus,
  updateData?: Partial<Screen>
): Screen[] => {
  return screens.map(screen => 
    screen.id === screenId
      ? { ...screen, ...updateData, status }
      : screen
  );
};