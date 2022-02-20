import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'


const SuccsesAlert = ({succsesAlert,setSuccsesAlert}) => {
    setTimeout(()=>{
        setSuccsesAlert(null)
    },5000)
	return (
		<div>
			<Stack sx={{ width: '100%' }} spacing={2}>
				<Alert severity='success'>{succsesAlert.message}</Alert>
			</Stack>
		</div>
	)
}

export default SuccsesAlert