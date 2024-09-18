import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import './app.css'
import { SelectTip } from './components/select-tip'
import * as yup from "yup"

const schema = yup
  .object({
    bill: yup.number().positive().required(),
    people: yup.number().min(1).positive().integer().required(),
  })
  .required()

export function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className='w-full flex flex-col lg:flex-row gap-10 bg-white h-fit p-8 rounded-2xl text-xl text-start '>
      <form onSubmit={handleSubmit(onSubmit)} className='flex-1 text-strong-cyan flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <div class='flex gap-10 items-center justify-between'>
            <label htmlFor="bill">Bill</label>
            <div className={'flex-1 text-sm text-red-500'}>{errors.bill?.message}</div>
          </div>
          <div className='relative w-full'>
            <div className='absolute top-3 left-3'>$</div>
            <input {...register('bill')} onChange={onSubmit} className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='bill' name='bill' defaultValue={'0'} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="select-tip">Select Tip</label>
          <SelectTip />
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex gap-10 items-center justify-between">
            <label htmlFor="people">Number of People</label>
            {errors.people && <div class='flex-1 text-sm text-red-500'>Can't be zero</div>}
          </div>
          <div className='relative w-full'>
            <svg className="absolute top-3 left-3 w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
            </svg>
            <input {...register('people')} onChange={onSubmit} className='w-full bg-very-light-grayish-cyan active:border-none active:outline-none p-2.5 text-end' type="number" id='people' name='people' defaultValue={'0'} />
          </div>        </div>
      </form>
      <div className='flex-1 bg-strong-cyan rounded-xl flex flex-col gap-10 p-10 justify-between'>
        <div className='flex flex-col gap-10'>
          <div className="flex justify-between items-center">
            <div>
              <div>Tip Amount</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div class='text-6xl text-grayish-cyan'>$0</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>Total</div>
              <span className='text-light-grayish-cyan text-sm'>/ person</span>
            </div>
            <div className='text-6xl text-grayish-cyan'>$0</div>
          </div>
        </div>
        <button class='p-2.5 bg-light-grayish-cyan text-strong-cyan rounded-md'>RESET</button>
      </div>
    </div>
  )
}

