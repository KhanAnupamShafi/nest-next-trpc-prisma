import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}
  // PokeAPI URL
  private readonly pokeApiUrl = 'https://pokeapi.co/api/v2/';

  // App router with getUsers and getByName
  appRouter = this.trpc.router({
    getUsers: this.trpc.procedure
      .input(
        z.object({
          name: z.string(),
        }),
      )
      .query(({ input }) => {
        console.log(input);
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Dip`}`,
        };
      }),

    getByName: this.trpc.procedure
      .input(z.object({ name: z.string() }))
      .query(async ({ input }) => {
        const pokeRes = await fetch(`${this.pokeApiUrl}/pokemon/${input.name}`);

        if (!pokeRes.ok) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Pokemon with name ${input.name} not found`,
          });
        }

        const data = await pokeRes.json();

        // ToDO Validate the response using Zod (assuming pokemonValidator is defined)
        return data;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
