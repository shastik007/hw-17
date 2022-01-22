import ExpenseForm from './ExpenseForm'
import './NewExpenses.css'

// этот компонен делает update данных которые пришли в него от дочерних элементов 
const NewExpenses = (props) => {
	const SaveExpensesDataHandler = (enteredExpensesData) => {
		const expensesData = {
			...enteredExpensesData,
			id: Math.random().toString(),
		}
		// console.log(expensesData);
		props.newData(expensesData)
	} // та самая функция которая помогает получать объект от дочерних элементов , в этом случае мы получаем объект и деструктизируем его с помощью spreead оператора и добовляем в него id с помощью метода random И с помощью метода toString переобразуем его чтоб в дольнейшем не было проблем
	return (
		<div className='new-expense'>
			<ExpenseForm onSaveExpensesData={SaveExpensesDataHandler} />
		</div>
	)
}

export default NewExpenses
