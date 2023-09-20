import axios from "axios";
import { useState } from "react";
import loginImg from "../assets/images/login-image.webp";
import { redirect, useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});

			const token = response.data.token;
			const employeeId = response.data.employeeId;
			localStorage.setItem("token", token);
			localStorage.setItem("employeeId", employeeId);
			navigate("/");
		} catch (error) {
			setErrorMessage("Invalid username or password");
		}
	};

	return (
		<>
			<section
				className="vh-100"
				style={{ backgroundColor: "black", width: "100% !important" }}
			>
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col col-xl-12">
							<div
								className="card"
								style={{ borderRadius: "1rem" }}
							>
								<div className="row g-0">
									<div className="col-md-6 col-lg-6 d-none d-md-block">
										<img
											src={loginImg}
											alt="login form"
											className="img-fluid"
											style={{
												borderRadius: "1rem 0 0 1rem;",
												width: "100%",
												height: "100%",
											}}
										/>
									</div>
									<div className="col-md-6 col-lg-6 d-flex align-items-center">
										<div className="card-body p-4 p-lg-5 text-black">
											<h3 className="login-title">
												Engineered Plans Employee Portal
											</h3>
											<form>
												<h5
													className="fw-normal mb-3 pb-3"
													style={{
														letterSpacing: "1px",
													}}
												>
													Sign into your account
												</h5>

												<div className="form-outline mb-4">
													<input
														type="email"
														id="form2Example17"
														className="form-control form-control-lg"
														value={username}
														onChange={(e) =>
															setUsername(
																e.target.value
															)
														}
													/>
												</div>

												<div className="form-outline mb-4">
													<input
														type="password"
														id="form2Example27"
														className="form-control form-control-lg"
														value={password}
														onChange={(e) =>
															setPassword(
																e.target.value
															)
														}
													/>
												</div>

												<div className="pt-1 mb-4">
													<button
														className="btn btn-dark btn-lg btn-block"
														type="button"
														onClick={handleLogin}
													>
														Login
													</button>
												</div>

												<a className="small text-muted">
													Forgot password?
												</a>
												<p
													className="mb-5 pb-lg-2"
													style={{ color: "#393f81" }}
												>
													Please contact your
													administrator to request a
													password reset.
												</p>
											</form>
											{errorMessage && (
												<div
													className="alert alert-danger"
													role="alert"
												>
													{errorMessage}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
