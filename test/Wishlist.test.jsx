import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/context/ThemeContext';
import Wishlist from '../src/components/profile/Wishlist';

const Wrapper = ({ children }) => (
    <MemoryRouter>
        <ThemeProvider>{children}</ThemeProvider>
    </MemoryRouter>
);

describe('Wishlist image rendering', () => {
    it('renders image with poster URL when available', () => {
        const wishlist = [
            { animeId: '1', title: 'Anime One', poster: 'https://example.com/poster1.jpg' },
        ];

        render(<Wishlist wishlist={wishlist} loading={false} onRemove={() => {}} />, { wrapper: Wrapper });

        const img = screen.getByAltText('Anime One');
        expect(img).toHaveAttribute('src', 'https://example.com/poster1.jpg');
    });

    it('renders image with image URL when poster is missing', () => {
        const wishlist = [
            { animeId: '2', title: 'Anime Two', image: 'https://example.com/image2.jpg' },
        ];

        render(<Wishlist wishlist={wishlist} loading={false} onRemove={() => {}} />, { wrapper: Wrapper });

        const img = screen.getByAltText('Anime Two');
        expect(img).toHaveAttribute('src', 'https://example.com/image2.jpg');
    });

    it('shows fallback UI when image fails to load', () => {
        const wishlist = [
            { animeId: '3', title: 'Anime Three', poster: 'https://example.com/broken.jpg' },
        ];

        render(<Wishlist wishlist={wishlist} loading={false} onRemove={() => {}} />, { wrapper: Wrapper });

        const img = screen.getByAltText('Anime Three');
        fireEvent.error(img);

        expect(screen.getByText('Anime Three')).toBeInTheDocument();
        expect(screen.queryByRole('img', { name: 'Anime Three' })).not.toBeInTheDocument();
    });

    it('retries image loading after wishlist data changes (broken state resets)', async () => {
        const initialWishlist = [
            { animeId: '4', title: 'Anime Four', poster: 'https://example.com/broken.jpg' },
        ];
        const updatedWishlist = [
            { animeId: '4', title: 'Anime Four', poster: 'https://example.com/fixed.jpg' },
        ];

        const { rerender } = render(
            <Wishlist wishlist={initialWishlist} loading={false} onRemove={() => {}} />,
            { wrapper: Wrapper }
        );

        const img = screen.getByAltText('Anime Four');
        fireEvent.error(img);

        await waitFor(() => {
            expect(screen.queryByRole('img', { name: 'Anime Four' })).not.toBeInTheDocument();
        });

        rerender(
            <MemoryRouter>
                <ThemeProvider>
                    <Wishlist wishlist={updatedWishlist} loading={false} onRemove={() => {}} />
                </ThemeProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            const newImg = screen.getByAltText('Anime Four');
            expect(newImg).toHaveAttribute('src', 'https://example.com/fixed.jpg');
        });
    });
});
