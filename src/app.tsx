import { useEffect, useState } from 'preact/hooks';
import './app.css'

export function App() {
  const [bill, setBill]       = useState('142.55');
  const [people, setPeople]   = useState('5')
  const [customTipPercentage, setCustomTipPercentage] = useState('0')

  const [result, setResult] = useState({
    tipAmountPerPeople: 0,
    totalAmountPerPeople: 0
  });

  const handleBillChange = (event: any) => {
    setBill(event.target?.value);
  }

  const handleCustomPercentage = (event: any) => {
    let value = event.target.value;

    if(Number(value) > 100) {
      value = '100';
    }

    if(Number(value) < 0) {
      value = '0';
    }

    setCustomTipPercentage(value);
  }

  const handlePeopleChange = (event: any) => {
    setPeople(event.target.value);
  }

  const [selectTips, setSelectTips] = useState<{name:string, checked:boolean}[]>(
    [
      { name: "5%", checked: false },
      { name: "10%", checked: false },
      { name: "15%", checked: true },
      { name: "25%", checked: false },
      { name: "50%", checked: false },
      { name: "Custom", checked: false },
    ]
  )


  const onSelectTip = (index: number) => {
    var updatedOptions = selectTips.slice().map((selectTip, selectedIndex) => {
      selectTip.checked = index === selectedIndex ? true : false;
      return selectTip;
    });

    setSelectTips([...updatedOptions])
  }

  const calculateTip = () => {

    console.log('calculateTip')

    let tipPercentage = 10;

    let selectTipOption = selectTips.find((selectTip) => selectTip.checked)?.name;

    if(selectTipOption === "Custom") {
      tipPercentage = Number(customTipPercentage);
    } else {
      tipPercentage = Number(selectTipOption?.replace('%', ''))
    }

    let tipAmount = Number(bill) * (tipPercentage / 100);
    let totalAmount = Number(bill) + tipAmount;

    let result = Number(people) > 0 ? {
      tipAmountPerPeople: tipAmount / Number(people),
      totalAmountPerPeople: totalAmount / Number(people)
    } :
    {
      tipAmountPerPeople: 0,
      totalAmountPerPeople: 0
    };

    setResult(result);
  }

  const resetForm = () => {
    setBill('0')
    setPeople('0')
    setCustomTipPercentage('0')
  }

  useEffect ( calculateTip, [bill, customTipPercentage, people, selectTips])

  return (
    <div className='w-full flex flex-col lg:flex-row gap-10 bg-white h-fit p-8 rounded-2xl text-xl text-start '>
      <form className='flex-1 text-strong-cyan flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <div class='flex gap-10 items-center justify-between'>
            <label htmlFor="bill">Bill {bill}</label>
          </div>
          <div className='relative w-full'>
            <div className='absolute top-3 left-3'>$</div>
            <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='bill' value={bill} defaultValue={'0'} onInput={handleBillChange} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="select-tip">Select Tip</label>
          <div class="grid grid-cols-3 grid-rows-2 w-full gap-6 text-center">{
            Array.isArray(selectTips) && selectTips.map((option, index) =>
               (
                option.name === 'Custom' ?
                  <div key={option.name} className={`${option.checked ? 'bg-white' : 'bg-light-grayish-cyan  p-2.5'} rounded-md cursor-pointer`}>
                    <input
                      type="radio"
                      name="select-tip"
                      id={option.name}
                      checked={option.checked}
                      onChange={() => {
                        onSelectTip(index);
                      }} />
                    {
                      option.checked ?
                        <div className='w-full'>
                          <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" defaultValue={'0'} value={customTipPercentage} onInput={handleCustomPercentage}/>
                        </div> :
                        <label htmlFor={option.name}>{option.name}</label>
                    }
                  </div> :

                  <div key={option.name} className={`${option.checked ? 'bg-light-grayish-cyan' : 'bg-strong-cyan'} p-2.5 rounded-md cursor-pointer`}>
                    <input
                      type="radio"
                      name="select-tip"
                      id={option.name}
                      checked={option.checked}
                      onChange={onSelectTip.bind(null, index)} />
                    <label className={(option.checked ? 'text-strong-cyan' : 'text-white') + " cursor-pointer py-2.5 px-6"} htmlFor={option.name}>{option.name}</label>
                  </div>
              ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex gap-10 items-center justify-between">
            <label htmlFor="people">Number of People</label>
            {Number(people) <= 0 && <div class='flex-1 text-sm text-red-500 text-end'>Can't be zero</div>}
          </div>
          <div className='relative w-full'>
            <svg className="absolute top-3 left-3 w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
            </svg>
            <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='people' value={people} defaultValue={'0'} onInput={handlePeopleChange} />
          </div>
        </div>
      </form>
      <div className='flex-1 bg-strong-cyan rounded-xl flex flex-col gap-10 p-10 justify-between'>
        <div className='flex flex-col gap-10'>
          <div className="flex justify-between items-center">
            <div>
              <div>Tip Amount</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div class='text-6xl text-grayish-cyan'>${result.tipAmountPerPeople.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>Total</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div className='text-6xl text-grayish-cyan'>${result.totalAmountPerPeople.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</div>
          </div>
        </div>
        <button type={'reset'} className='p-2.5 bg-light-grayish-cyan text-strong-cyan rounded-md' onClick={resetForm}>RESET</button>
      </div>
    </div>
  )
}

