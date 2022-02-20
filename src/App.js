import React, { useCallback, useEffect, useState } from 'react'
import Expenses from './components/Expenses/Expenses'
import NewExpenses from './components/NewExpenses/NewExpenses'
import SuccsesAlert from './components/UI/SuccsesAlert'
import ErrorAlert from './components/UI/ErrorAlert'

const INIT_DATA = [
	// {
	// 	id: 'e1',
	// 	title: 'Toilet Paper',
	// 	amount: 94.12,
	// 	date: new Date(2022, 7, 14),
	// },
	// {
	// 	id: 'e3',
	// 	title: 'Car Insurance',
	// 	amount: 294.67,
	// 	date: new Date(2023, 2, 28),
	// },
	// {
	// 	id: 'e4',
	// 	title: 'New Desk (Wooden)',
	// 	amount: 450,
	// 	date: new Date(2024, 5, 12),
	// },
] // Это массив который будет отоброжаться по умолчанию

// этот компонент получает данные от дочерних компонентов и добовляет его в свой пропс (точнее в массив чтоб в дольнейшем сообщать браузеру что если стейт обновиться реакту нужно обновляться)
const App = () => {
	const [expenses, setExpenses] = useState([])
	const [loading, setLoading] = useState(false)
	const [succsesAlert, setSuccsesAlert] = useState(null)
	const [errorAlert, setErrorAlert] = useState(null)
	const [postError, setPostError] = useState(null)

	//стейт который содержит default ные значения но в дольнейшем этот стейт будет обновлять список (коротко говоря стейт который товечает за  отоброжения данных которые в массиве и которые присоеденяться в массив  )
	const GetData = useCallback(async () => {
		setLoading(true)
		try {
			const response = await fetch(
				'https://expense-tracker-f2bd2-default-rtdb.firebaseio.com/item.json',
			)
			if (!response.ok) {
				return new Error('somthing went wrong')
			}
			const data = await response.json()

			let loadingData = []

			for (const key in data) {
				loadingData.push({
					id: data[key].id,
					title: data[key].title,
					amount: data[key].amount,
					date: new Date(data[key].date),
				})
			}

			setExpenses(loadingData)
			setLoading(false)
		} catch (error) {
			setErrorAlert(error.message)
		}
	}, [])

	useEffect(() => {
		GetData()
	}, [GetData])

	const NewExpensesData = async (newData) => {
		try {
			const response = await fetch(
				'https://expense-tracker-f2bd2-default-rtdb.firebaseio.com/item.json',
				{
					method: 'POST',
					body: JSON.stringify(newData),
					Headers: {
						'Content-type': 'application/json',
					},
				},
			)
			if (!response.ok) {
				throw new Error('failed to send data')
			}
			const result = await response.json()
			GetData()
			setSuccsesAlert({ message: 'data added successfully' })
			console.log(result)
		} catch (error) {
			setPostError(error.message)
		}
	}

	// функция которая получает данные из newExpenses и добовляет его в стейт (expenses) с помошью функции (setExpenses) стейта который обновляет стейт(сообщает реакт что стейт обновился) она получает данные с помошью поднятия данных(lifting up )

	return (
		<div>
			{succsesAlert && (
				<SuccsesAlert
					succsesAlert={succsesAlert}
					setSuccsesAlert={setSuccsesAlert}
				/>
			)}
			{errorAlert && (
				<ErrorAlert
					errorAlert={errorAlert}
					setErrorAlert={setErrorAlert}
				/>
			)}
			{postError && <ErrorAlert
					errorAlert={postError}
					setErrorAlert={setPostError}
				/>}
			<NewExpenses newData={NewExpensesData} />
			{/*тут мы отдаем с помощью пропсов функция которая поднимает данные */}
			<Expenses loading={loading} items={expenses} />{' '}
			{/* тут мы отдаем стейт для дольнейшей обработки данных */}
		</div>
	)
}

export default App
