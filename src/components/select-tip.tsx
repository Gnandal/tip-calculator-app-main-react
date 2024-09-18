import { useSelectTipStore } from "../store/select-store";

export const SelectTip = () => {
    const options = useSelectTipStore((state) => state.selectTipState);
    const onChange = useSelectTipStore((state) => state.selectTipUpdate);

    return <div class="grid grid-cols-3 grid-rows-2 w-full gap-6 text-center">{
        options.map((option, index) => {
            return (
                <div className={`${option.checked?'bg-light-grayish-cyan':'bg-strong-cyan'} p-2.5 rounded-md cursor-pointer`}>
                    <input
                        type="radio"
                        name="select"
                        id={option.name}
                        checked={option.checked}
                        onChange={onChange.bind(undefined, index)} />
                    <label className={option.checked ? 'text-strong-cyan' : 'text-white'} htmlFor={option.name}>{option.name}</label>
                </div>
            )
        })
    }</div>;
}