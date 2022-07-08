import { match, P } from 'ts-pattern';

/**
 * @see {@link https://zenn.dev/aki202/articles/5d725c080640f9?utm_source=pocket_mylist#fn-6b42-3}
 */

describe('ts-pattern', () => {
  it('サンプル', () => {
    type Data = { type: 'text'; content: string } | { type: 'img'; src: string };
    type Result = { type: 'ok'; data: Data } | { type: 'error'; error: Error };

    const result: Result = { type: 'ok', data: { type: 'text', content: 'test' } } as Result;

    const response = match(result)
      .with({ type: 'error' }, () => `<p>Oups! An error occured</p>`)
      .with({ type: 'ok', data: { type: 'text' } }, (res) => `<p>${res.data.content}</p>`)
      .with({ type: 'ok', data: { type: 'img', src: P.select() } }, (src) => `<img src=${src} />`)
      .exhaustive();

    expect(response).toBe('<p>test</p>');
  });

  it('状態遷移', () => {
    type State =
      | { status: 'idle' }
      | { status: 'loading'; startTime: number }
      | { status: 'success'; data: string }
      | { status: 'error'; error: Error };

    type Event =
      | { type: 'fetch' }
      | { type: 'success'; data: string }
      | { type: 'error'; error: Error }
      | { type: 'cancel' };

    const reducer = (state: State, event: Event): State =>
      match<[State, Event], State>([state, event])
        .with([{ status: 'loading' }, { type: 'success' }], ([, event]) => ({
          status: 'success',
          data: event.data,
        }))
        .with([{ status: 'loading' }, { type: 'error', error: P.select() }], (error) => ({
          status: 'error',
          error,
        }))
        .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
          status: 'loading',
          startTime: Date.now(),
        }))
        .with(
          [
            {
              status: 'loading',
              startTime: P.when((t) => t + 2000 < Date.now()),
            },
            { type: 'cancel' },
          ],
          () => ({
            status: 'idle',
          })
        )
        .with(P._, () => state)
        .exhaustive();

    expect(reducer({ status: 'loading', startTime: 0 }, { type: 'success', data: 'good' })).toEqual({
      status: 'success',
      data: 'good',
    });
  });
});
