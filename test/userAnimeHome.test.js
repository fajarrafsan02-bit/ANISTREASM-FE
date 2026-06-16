import { renderHook, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import { it } from "vitest";
import useAnimeHome from "../src/hooks/useAnimeHome";
import useHeroAnimeHome from "../src/hooks/UseHeroAnimeHome";

describe('Use anime Integration Test', () => {
    it('should fetch real anime home data', async () => {
        const { result } = renderHook(() => useAnimeHome());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeNull();
    });

    it('should fetch real hero anime home data', async () => {
        const { result } = renderHook(() => useHeroAnimeHome());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeNull();
        console.log(result.current.heroAnime);
    });
});