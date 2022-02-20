import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'

export const WrapperAlert = styled.div`
	width: 600px;
	margin: 0 auto;
	animation: IN ease-in 0.7s;
    @keyframes IN {
		0%{
			opacity: 0;
		}
	    100%{
			opacity: 1;
		}
	}
`

const ErrorAlert = ({ errorAlert, setErrorAlert }) => {
	setTimeout(() => {
		setErrorAlert(null)
	}, 5000)
	return (
		<WrapperAlert>
			<Stack sx={{ width: '100%' }} spacing={2}>
				<Alert severity='error'>{errorAlert}</Alert>
			</Stack>
		</WrapperAlert>
	)
}

export default ErrorAlert
