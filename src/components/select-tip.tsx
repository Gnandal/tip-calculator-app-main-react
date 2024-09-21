import { useSelectTipStore } from "../store/select-store";

export const SelectTip = () => {
    const options = useSelectTipStore((state) => state.selectTipState);
    const onChange = useSelectTipStore((state) => state.selectTipUpdate);

    return <div class="grid grid-cols-3 grid-rows-2 w-full gap-6 text-center">{
        options.map((option, index) => {
            return (
                option.name === 'Custom' ?
                    <div className={`${option.checked ? 'bg-white' : 'bg-light-grayish-cyan  p-2.5'} rounded-md cursor-pointer`}>
                        <input
                            type="radio"
                            name="select-tip"
                            id={option.name}
                            checked={option.checked}
                            onChange={onChange.bind(undefined, index)} />
                        {
                            option.checked ?
                                <div className='w-full'>
                                    <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='bill' name='bill' defaultValue={'0'} onChange={onChange.bind(undefined, index)}/>
                                </div> :
                                <label htmlFor={option.name}>{option.name}</label>}
                    </div> :

                    <div className={`${option.checked ? 'bg-light-grayish-cyan' : 'bg-strong-cyan'} p-2.5 rounded-md cursor-pointer`}>
                        <input
                            type="radio"
                            name="select-tip"
                            id={option.name}
                            checked={option.checked}
                            onChange={onChange.bind(undefined, index)} />
                        <label className={option.checked ? 'text-strong-cyan' : 'text-white'} htmlFor={option.name}>{option.name}</label>
                    </div>
            )
        })}
    </div>;
}