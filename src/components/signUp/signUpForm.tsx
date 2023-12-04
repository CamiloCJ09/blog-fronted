import * as React from "react"
import { FormEvent } from 'react';
import { TextField, Container, Box, Button } from "@mui/material"
import { FormControl, InputLabel, OutlinedInput } from "@mui/material"
import { InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/authService"
import Swal from "sweetalert2"

interface Credentials{
  username: string;
  email: string;
  password: string;
}

const credentials : Credentials = {
  username: "",
  email: "",
  password: "",
}

const SignUpForm = () => {
  const [username, setUsername] = useState(credentials.email)
  const [email, setEmail] = useState(credentials.email)
  const [password, setPassword] = useState(credentials.password)
  const [confirmPassword, setConfirmPassword] = useState(credentials.password)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfrimPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(password !== confirmPassword){
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-family: Arial, sans-serif;">Bad authentication</span>',
        html: '<div style="font-family: Arial, sans-serif;">Password and Confirm Password are not the same</div>',
      })
      return
    }

    try {
      
      await authServices.register({
        name: username,
        email: email,
        password: password,
      })
      const token = await authServices.login({
        email: email,
        password: password,
      })
      localStorage.setItem("token", JSON.stringify(token.data.token))
      localStorage.setItem("userId", token.data.userId)
      localStorage.setItem("email", JSON.stringify(email))
      navigate("/posts", { replace: true }) 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-family: Arial, sans-serif;">Bad authentication</span>',
        html: '<div style="font-family: Arial, sans-serif;">Email or Password incorrect</div>',
      })
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSignUp}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleUsername}
            />
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={handleEmail}
            />
            <FormControl fullWidth margin="normal" variant="outlined" color="primary">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handlePassword}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined" color="primary">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handleConfrimPassword}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={email=="" || password=="" || username=="" || confirmPassword==""}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#D3D3D3",
                color: "black",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                  transition: "0.5s",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default SignUpForm
