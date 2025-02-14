import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../actions/authActions";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";

const AuthLogin = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // local loading just to show spinner on the button
  const [localLoading, setLocalLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pull these from Redux
  const { error, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      // If there's a token, it means login succeeded
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    dispatch(loginUser(email, password)).finally(() => setLocalLoading(false)); // stop spinner
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      <Stack component="form" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error">The username or password is incorrect!</Alert>
        )}

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={localLoading || loading} // disable if loading
          >
            {localLoading || loading ? (
              <CircularProgress size={24} />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default AuthLogin;
