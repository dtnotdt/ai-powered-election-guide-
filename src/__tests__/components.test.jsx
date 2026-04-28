"use client";
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Test that components render without crashing
describe('Component Rendering', () => {
  it('renders LandingScreen with user', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    const mockUser = { displayName: 'Test User', isAnonymous: false };
    const { container } = render(<LandingScreen setScreen={() => {}} user={mockUser} />);
    expect(container.querySelector('.landing')).toBeInTheDocument();
    expect(screen.getAllByText(/VoteVerse/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Welcome, Test/)).toBeInTheDocument();
  });

  it('renders LandingScreen with guest user', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    const mockUser = { isAnonymous: true };
    render(<LandingScreen setScreen={() => {}} user={mockUser} />);
    expect(screen.getByText(/Welcome, Guest/)).toBeInTheDocument();
  });

  it('renders landing action buttons', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    render(<LandingScreen setScreen={() => {}} user={null} />);
    expect(screen.getByText(/Cinematic Story/)).toBeInTheDocument();
    expect(screen.getByText(/EVM Simulator/)).toBeInTheDocument();
    expect(screen.getByText(/AI Assistant/)).toBeInTheDocument();
    expect(screen.getByText(/What-If Scenarios/)).toBeInTheDocument();
  });

  it('renders BadgesScreen', async () => {
    const BadgesScreen = (await import('../components/badges/BadgesScreen')).default;
    const badges = { firstStep: true, learner: false, voter: false, expert: false };
    render(<BadgesScreen badges={badges} />);
    expect(screen.getByText(/Your Badges/)).toBeInTheDocument();
    expect(screen.getByText(/First Step/)).toBeInTheDocument();
  });

  it('renders ChecklistTracker', async () => {
    const ChecklistTracker = (await import('../components/checklist/ChecklistTracker')).default;
    const checklist = { register: false, checkId: false, findBooth: false, vote: false };
    render(<ChecklistTracker checklist={checklist} toggleChecklistItem={() => {}} progress={0} />);
    expect(screen.getByText(/Progress Tracker/)).toBeInTheDocument();
    expect(screen.getByText(/Register as Voter/)).toBeInTheDocument();
  });

  it('renders FloatingNav', async () => {
    const FloatingNav = (await import('../components/navigation/FloatingNav')).default;
    const { container } = render(<FloatingNav setScreen={() => {}} current="evm" />);
    expect(container.querySelector('.floating-nav')).toBeInTheDocument();
  });

  it('renders AuthGate when loading', async () => {
    const AuthGate = (await import('../components/auth/AuthGate')).default;
    const { container } = render(<AuthGate loadingUser={true} />);
    expect(container.querySelector('.auth-gate')).toBeInTheDocument();
    expect(container.querySelector('.auth-loader')).toBeInTheDocument();
  });

  it('renders AuthGate sign-in form', async () => {
    const AuthGate = (await import('../components/auth/AuthGate')).default;
    render(<AuthGate loadingUser={false} />);
    expect(screen.getByText(/Continue with Google/)).toBeInTheDocument();
    expect(screen.getByText(/Continue as Guest/)).toBeInTheDocument();
  });

  it('renders ElectionSandbox', async () => {
    const ElectionSandbox = (await import('../components/sandbox/ElectionSandbox')).default;
    render(<ElectionSandbox setScreen={() => {}} />);
    expect(screen.getByText(/What-If Scenarios/)).toBeInTheDocument();
    expect(screen.getByText(/Lost Voter ID/)).toBeInTheDocument();
  });
});

describe('Component Interactions', () => {
  it('landing screen navigates on button click', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    let navigatedTo = '';
    render(<LandingScreen setScreen={(screen) => { navigatedTo = screen; }} user={null} />);

    fireEvent.click(screen.getByText(/EVM Simulator/));
    expect(navigatedTo).toBe('evm');
  });

  it('navigation highlights active item', async () => {
    const FloatingNav = (await import('../components/navigation/FloatingNav')).default;
    const { container } = render(<FloatingNav setScreen={() => {}} current="chat" />);
    const activeBtn = container.querySelector('#nav-chat');
    expect(activeBtn).toHaveClass('active');
  });

  it('checklist items are clickable', async () => {
    const ChecklistTracker = (await import('../components/checklist/ChecklistTracker')).default;
    let toggledKey = '';
    const checklist = { register: false, checkId: false, findBooth: false, vote: false };
    render(
      <ChecklistTracker
        checklist={checklist}
        toggleChecklistItem={(key) => { toggledKey = key; }}
        progress={0}
      />
    );

    fireEvent.click(screen.getByText(/Register as Voter/));
    expect(toggledKey).toBe('register');
  });

  it('sandbox scenarios expand on click', async () => {
    const ElectionSandbox = (await import('../components/sandbox/ElectionSandbox')).default;
    render(<ElectionSandbox setScreen={() => {}} />);

    fireEvent.click(screen.getByText(/Lost Voter ID on Election Day/));
    // After clicking, the answer should be visible
    expect(screen.getByText(/Aadhaar Card/)).toBeInTheDocument();
    expect(screen.getByText(/Official ECI Guidelines/)).toBeInTheDocument();
  });

  it('PersonaSelector handles keyboard navigation', async () => {
    const PersonaSelector = (await import('../components/election/PersonaSelector')).default;
    let selected = '';
    render(<PersonaSelector onSelect={(id) => { selected = id; }} initialId="first-time" />);
    
    const firstTimeBtn = screen.getByRole('radio', { name: /First-Time Voter/i });
    firstTimeBtn.focus();
    
    // Test Right Arrow
    fireEvent.keyDown(firstTimeBtn, { key: 'ArrowRight' });
    expect(selected).toBe('returning');
    
    const returningBtn = screen.getByRole('radio', { name: /Returning Voter/i });
    expect(document.activeElement).toBe(returningBtn);

    // Test Left Arrow
    fireEvent.keyDown(returningBtn, { key: 'ArrowLeft' });
    expect(selected).toBe('first-time');
  });

  it('ElectionJourneyMap toggles nodes', async () => {
    const ElectionJourneyMap = (await import('../components/election/ElectionJourneyMap')).default;
    let selected = '';
    render(<ElectionJourneyMap activeStageId="registration" onNodeSelect={(id) => { selected = id; }} />);
    
    // Initially registration should be expanded
    expect(screen.getByText(/Ensure your name is on the electoral roll/)).toBeInTheDocument();
    
    // Click next node
    const campaignBtn = screen.getByRole('button', { name: /Election Campaign/i });
    fireEvent.click(campaignBtn);
    expect(selected).toBe('campaign');
    expect(screen.getByText(/Parties release manifestos/)).toBeInTheDocument();
  });
});
