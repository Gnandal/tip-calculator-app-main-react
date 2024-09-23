import { useState } from 'preact/hooks'
import './app.css'
import { SelectTip } from './components/select-tip'
import { useSelectTipStore } from './store/select-store'

type TipResult = {
  tipAmountPerPeople: number,
  totalAmountPerPeople: number
}

export function App() {
  const [bill, setBilling] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);
  const [tipResult, setTipResult] = useState<TipResult>({
    tipAmountPerPeople: 0,
    totalAmountPerPeople: 0
  });

  const selectTips = useSelectTipStore((state) => state.selectTipState);

  const handleBillChange = (event: any) => {
    const value:number = Number(event.target.value);

    if (value <= 0) {
      setBilling(0);
      return;
    }
    setBilling(value);

    calculateTip(people, value);
  }

  const handlePeopleChange = (event: any) => {
    const value:number = Number(event.target.value);
    
    if (value <= 0) {
      setPeople(0);
      return;
    }
    setPeople(value);

    calculateTip(value, bill);
  }

  const calculateTip = (people: number, bill: number) => {
    
    const tipPercentage = Number(selectTips.find((selectTip) => selectTip.checked)?.name.replace('%', ''));

    console.log(tipPercentage, people, bill);

    let tipAmount = bill * (tipPercentage/100);
    let totalAmount = bill + tipAmount;

    setTipResult(
      people > 0 ? {
        tipAmountPerPeople: tipAmount/people,
        totalAmountPerPeople: totalAmount/people
      } : {
        tipAmountPerPeople: 0,
        totalAmountPerPeople: 0
      }
    ) 
  }

  const onReset = () => {
    setBilling(0);
    setPeople(0);
    setTipResult({
      tipAmountPerPeople: 0,
      totalAmountPerPeople: 0
    });
  }


  
  return (
    <div className='w-full flex flex-col lg:flex-row gap-10 bg-white h-fit p-8 rounded-2xl text-xl text-start '>
      <form className='flex-1 text-strong-cyan flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <div class='flex gap-10 items-center justify-between'>
            <label htmlFor="bill">Bill</label>
          </div>
          <div className='relative w-full'>
            <div className='absolute top-3 left-3'>$</div>
            <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='bill' name='bill' value={bill} onChange={handleBillChange} defaultValue={'0'} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="select-tip">Select Tip</label>
          <SelectTip/>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex gap-10 items-center justify-between">
            <label htmlFor="people">Number of People</label>
            {people <= 0 && <div class='flex-1 text-sm text-red-500 text-end'>Can't be zero</div>} 
          </div>
          <div className='relative w-full'>
            <svg className="absolute top-3 left-3 w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
            </svg>
            <input className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='people' name='people' value={people} onChange={handlePeopleChange} min={0} defaultValue={'0'} />
          </div>        </div>
      </form>
      <div className='flex-1 bg-strong-cyan rounded-xl flex flex-col gap-10 p-10 justify-between'>
        <div className='flex flex-col gap-10'>
          <div className="flex justify-between items-center">
            <div>
              <div>Tip Amount</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div class='text-6xl text-grayish-cyan'>${tipResult.tipAmountPerPeople.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>Total</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div className='text-6xl text-grayish-cyan'>${tipResult.totalAmountPerPeople.toFixed(2)}</div>
          </div>
        </div>
        <button onClick={onReset} className='p-2.5 bg-light-grayish-cyan text-strong-cyan rounded-md'>RESET</button>
      </div>
    </div>
  )
}

