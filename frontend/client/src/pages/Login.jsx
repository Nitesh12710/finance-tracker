import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const result = await login(values);
    setSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="w-[460px] bg-white p-10 rounded-lg shadow-xl relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Finance Tracker</h1>
          <h2 className="text-xl text-gray-600">Sign in to your account</h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errors.general}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
                <div className="mt-2">
                  <label className="inline-flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
