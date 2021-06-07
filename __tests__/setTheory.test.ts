import _ from 'lodash';

describe('集合(配列)', () => {
  describe('配列', () => {
    describe('積集合', () => {
      const A = [1, 2, 4, 5, 7];
      const B = [2, 3, 5, 6, 8];
      const expectValue = [2, 5];
      it('filter', () => {
        expect(A.filter((val) => B.includes(val))).toEqual(expectValue);
      });

      it('intersection', () => {
        expect(_.intersection(A, B)).toEqual(expectValue);
      });
    });

    describe('和集合', () => {
      const A = [1, 2, 4, 5, 7];
      const B = [2, 3, 5, 6, 8];
      const expectValue = [1, 2, 3, 4, 5, 6, 7, 8];

      it('set', () => {
        expect([...new Set([...A, ...B])]).toEqual(expect.arrayContaining(expectValue));
      });

      it('reduce', () => {
        const result = [...A, ...B].reduce((cur, acc) => [...cur, ...(cur.includes(acc) ? [] : [acc])], [] as number[]);
        expect(result).toEqual(expect.arrayContaining(expectValue));
      });

      it('union', () => {
        expect(_.union(A, B)).toEqual(expect.arrayContaining(expectValue));
      });
    });

    describe('差集合', () => {
      const A = [1, 2, 4, 5, 7];
      const B = [2, 3, 5, 6, 8];
      const expectValue = [1, 4, 7];

      it('filter', () => {
        const result = A.filter((val) => !B.includes(val));
        expect(result).toEqual(expectValue);
      });

      it('reduce', () => {
        const result = A.reduce((acc, cur) => [...acc, ...(B.includes(cur) ? [] : [cur])], [] as number[]);
        expect(result).toEqual(expectValue);
      });

      it('difference', () => {
        const result = _.difference(A, B);
        expect(result).toEqual(expectValue);
      });
    });

    describe('排他的論理和', () => {
      const A = [1, 2, 4, 5, 7];
      const B = [2, 3, 5, 6, 8];
      const expectValue = [1, 3, 4, 6, 7, 8];

      it('xor', () => {
        const result = _.xor(A, B);
        expect(result.length).toBe(expectValue.length);
        expect(result).toEqual(expect.arrayContaining(expectValue));
      });

      it('filter', () => {
        const result = [...A, ...B].filter((val, _, arr) => arr.filter((v) => v === val).length === 1);
        expect(result.length).toBe(expectValue.length);
        expect(result).toEqual(expect.arrayContaining(expectValue));
      });

      it('reduce', () => {
        const result = [...A, ...B].reduce(
          (acc, cur, _, arr) => [...acc, ...(arr.filter((val) => val === cur).length === 1 ? [cur] : [])],
          [] as number[]
        );
        expect(result.length).toBe(expectValue.length);
        expect(result).toEqual(expect.arrayContaining(expectValue));
      });
    });
  });

  describe('オブジェクト', () => {
    describe('積集合', () => {
      const A = [
        { id: 1, x: 1 },
        { id: 2, x: 1 },
        { id: 4, x: 1 },
        { id: 5, x: 1 },
        { id: 7, x: 1 },
      ];
      const B = [
        { id: 2, x: 1 },
        { id: 3, x: 1 },
        { id: 5, x: 1 },
        { id: 6, x: 1 },
        { id: 8, x: 1 },
      ];
      const expectValue = [
        { id: 2, x: 1 },
        { id: 5, x: 1 },
      ];
      it('filter', () => {
        expect(A.filter((valA) => B.some((valB) => valB.id === valA.id))).toEqual(expectValue);
      });

      it('intersectionBy', () => {
        expect(_.intersectionBy(A, B, 'id')).toEqual(expectValue);
      });

      it('intersectionWith', () => {
        expect(_.intersectionWith(A, B, (a, b) => a.id === b.id)).toEqual(expectValue);
      });
    });
  });

  describe('和集合', () => {
    const A = [
      { id: 1, x: 1 },
      { id: 2, x: 1 },
      { id: 4, x: 1 },
      { id: 5, x: 1 },
      { id: 7, x: 1 },
    ];
    const B = [
      { id: 2, x: 1 },
      { id: 3, x: 1 },
      { id: 5, x: 1 },
      { id: 6, x: 1 },
      { id: 8, x: 1 },
    ];
    const expectValue = [
      { id: 1, x: 1 },
      { id: 2, x: 1 },
      { id: 3, x: 1 },
      { id: 4, x: 1 },
      { id: 5, x: 1 },
      { id: 6, x: 1 },
      { id: 7, x: 1 },
      { id: 8, x: 1 },
    ];

    it('reduce', () => {
      const result = [...A, ...B].reduce(
        (acc, cur) => [...acc, ...(acc.some((item) => item.id === cur.id) ? [] : [cur])],
        [] as { id: number; x: number }[]
      );
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });

    it('unionBy', () => {
      const result = _.unionBy(A, B, 'id');
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });

    it('unionWith', () => {
      const result = _.unionWith(A, B, (a, b) => a.id === b.id);
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });
  });

  describe('差集合', () => {
    const A = [
      { id: 1, x: 1 },
      { id: 2, x: 1 },
      { id: 4, x: 1 },
      { id: 5, x: 1 },
      { id: 7, x: 1 },
    ];
    const B = [
      { id: 2, x: 1 },
      { id: 3, x: 1 },
      { id: 5, x: 1 },
      { id: 6, x: 1 },
      { id: 8, x: 1 },
    ];
    const expectValue = [
      { id: 1, x: 1 },
      { id: 4, x: 1 },
      { id: 7, x: 1 },
    ];

    it('filter', () => {
      const result = A.filter((valA) => !B.some((valB) => valA.id === valB.id));
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expectValue);
    });

    // it('reduce', () => {
    //   const result = A.reduce((acc, cur) => [...acc, ...(B.includes(cur) ? [] : [cur])], [] as number[]);
    //   expect(result).toEqual(expectValue);
    // });

    it('differenceBy', () => {
      const result = _.differenceBy(A, B, 'id');
      expect(result).toEqual(expectValue);
    });

    it('differenceWith', () => {
      const result = _.differenceWith(A, B, (a, b) => a.id === b.id);
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });
  });

  describe('排他的論理和', () => {
    const A = [
      { id: 1, x: 1 },
      { id: 2, x: 1 },
      { id: 4, x: 1 },
      { id: 5, x: 1 },
      { id: 7, x: 1 },
    ];
    const B = [
      { id: 2, x: 1 },
      { id: 3, x: 1 },
      { id: 5, x: 1 },
      { id: 6, x: 1 },
      { id: 8, x: 1 },
    ];
    const expectValue = [
      { id: 1, x: 1 },
      { id: 3, x: 1 },
      { id: 4, x: 1 },
      { id: 6, x: 1 },
      { id: 7, x: 1 },
      { id: 8, x: 1 },
    ];

    it('xorBy', () => {
      const result = _.xorBy(A, B, 'id');
      expect(result.length).toBe(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });

    it('xorWith', () => {
      const result = _.xorWith(A, B, (a, b) => a.id === b.id);
      expect(result.length).toEqual(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });

    it('filter', () => {
      const result = [...A, ...B].filter((val, _, arr) => arr.filter((v) => v.id === val.id).length === 1);
      expect(result.length).toBe(expectValue.length);
      expect(result).toEqual(expect.arrayContaining(expectValue));
    });

    // it('reduce', () => {
    //   const result = [...A, ...B].reduce(
    //     (acc, cur, _, arr) => [...acc, ...(arr.filter((val) => val === cur).length === 1 ? [cur] : [])],
    //     [] as number[]
    //   );
    //   expect(result.length).toBe(expectValue.length);
    //   expect(result).toEqual(expect.arrayContaining(expectValue));
    // });
  });
});
