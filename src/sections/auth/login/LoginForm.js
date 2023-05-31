import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import Loader from '../../../components/loader/Loader';

import { login } from '../../../Redux/actions/userActions';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.userdata);

  const [loginData, setLoginData] = useState({
              email: "",
              password: ""
  })
  
  const inputChanged = (e) => {
      // console.log(e.target.name)
      // console.log(e.target.value)
      const loginDataFormat = loginData
      loginDataFormat[e.target.name] = e.target.value

      setLoginData(loginDataFormat)
  }

  const loader = () => {
      // console.log(this.props.userdata?.isLoadingConnexion)
      return <Loader loading={userdata?.isLoadingConnexion} /> //this.userdata?.isLoadingGetCentre: false, isSuccessGetCentre: false,
  }

  const handleClick = async (e) => {
      e.preventDefault()
      // console.log(loginData)
      if(loginData.email !== "" || loginData.password !== ""){
          await dispatch(login(loginData.email, loginData.password))
      }
  }

  let {isAuthenticated, token_access} = userdata

  if(isAuthenticated === true && token_access !== null ){
        navigate('/dashboard', { replace: true });
  }

  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Adresse email" 
          onChange={inputChanged}
        />

        <TextField
          name="password"
          label="Mot de passe"
          onChange={inputChanged}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Mot de passe oublié?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Connexion
      </LoadingButton>
    </>
  );
}
