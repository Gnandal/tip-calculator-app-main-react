import { create } from 'zustand'

interface SelectTip {
  name: string,
  checked: boolean
}

interface SelectTipStore {
  selectTipState: SelectTip[];
  selectTipUpdate: (selectedIndex: Number) => void;
}

export const useSelectTipStore = create<SelectTipStore>((set) => ({
  selectTipState: [
    { name: "5%", checked: false },
    { name: "10%", checked: true },
    { name: "15%", checked: false },
    { name: "25%", checked: false },
    { name: "50%", checked: false },
    { name: "Custom", checked: false },
  ],
  selectTipUpdate: (selectedIndex: Number) => {
    set((state) => {
      var updatedOptions = state.selectTipState.slice().map((selectTip, index) => {
        selectTip.checked = index === selectedIndex ? true : false;
        return selectTip;
      });
      
      return { selectTipState: [...updatedOptions] }
    })
  },
}))


export const getActiveselectTipName = () => {
  const selectTips = useSelectTipStore((state) => state.selectTipState);
  return selectTips.find((selectTip) => selectTip.checked)?.name.toLocaleLowerCase();
}