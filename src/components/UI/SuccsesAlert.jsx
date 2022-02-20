import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { WrapperAlert } from './ErrorAlert'


const SuccsesAlert = ({succsesAlert,setSuccsesAlert}) => {
    setTimeout(()=>{
        setSuccsesAlert(null)
    },5000)
	return (
		<WrapperAlert>
			<Stack sx={{ width: '100%' }} spacing={2}>
				<Alert severity='success'>{succsesAlert.message}</Alert>
			</Stack>
		</WrapperAlert>
	)
}

export default SuccsesAlert