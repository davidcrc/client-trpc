import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../mern-trpc-crud/src/app';
 
export const trpc = createTRPCReact<AppRouter>();