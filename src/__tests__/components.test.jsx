import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Test that components render without crashing
describe('Component Rendering', () => {
  it('renders LandingScreen', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    const { container } = render(<LandingScreen setScreen={() => {}} />);
    expect(container.querySelector('.landing')).toBeInTheDocument();
    expect(screen.getAllByText(/VoteVerse/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/India/)[0]).toBeInTheDocument();
  });

  it('renders landing action buttons', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    render(<LandingScreen setScreen={() => {}} />);
    expect(screen.getByText(/Cinematic Story/)).toBeInTheDocument();
    expect(screen.getByText(/EVM Simulator/)).toBeInTheDocument();
    expect(screen.getByText(/AI Assistant/)).toBeInTheDocument();
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
});

describe('Component Interactions', () => {
  it('landing screen navigates on button click', async () => {
    const LandingScreen = (await import('../components/landing/LandingScreen')).default;
    let navigatedTo = '';
    render(<LandingScreen setScreen={(screen) => { navigatedTo = screen; }} />);

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
});
