import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('shows the login/register gate when nobody is logged in', () => {
    renderApp();
    expect(screen.getByText('Autentifică-te ca să continui')).toBeInTheDocument();
  });

  it('lets a new user register and land on the home screen', async () => {
    renderApp();
    fireEvent.click(screen.getByText('Creează unul'));
    fireEvent.change(screen.getByPlaceholderText('Nume complet'), { target: { value: 'Maria Test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'maria@test.ro' } });
    fireEvent.change(screen.getByPlaceholderText('Parolă'), { target: { value: 'parola123' } });
    fireEvent.click(screen.getByText('Creează cont'));

    await waitFor(() => {
      expect(screen.getByText('Bună, Maria! 👋')).toBeInTheDocument();
    });
  });

  it('rejects login with a wrong password for an existing account', async () => {
    renderApp();
    fireEvent.click(screen.getByText('Creează unul'));
    fireEvent.change(screen.getByPlaceholderText('Nume complet'), { target: { value: 'Maria Test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'maria@test.ro' } });
    fireEvent.change(screen.getByPlaceholderText('Parolă'), { target: { value: 'parola123' } });
    fireEvent.click(screen.getByText('Creează cont'));
    await waitFor(() => expect(screen.getByText('Bună, Maria! 👋')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Profil'));
    await waitFor(() => expect(screen.getByText('Deconectare')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Deconectare'));
    await waitFor(() => expect(screen.getByText('Autentifică-te ca să continui')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'maria@test.ro' } });
    fireEvent.change(screen.getByPlaceholderText('Parolă'), { target: { value: 'gresita' } });
    fireEvent.click(screen.getByText('Autentificare'));

    await waitFor(() => {
      expect(screen.getByText('Parolă incorectă.')).toBeInTheDocument();
    });
  });
});
