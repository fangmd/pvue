import { common } from '@/utils';

describe('common utils test', () => {
  it('getNum2', () => {
    let val = common.getNum2();
    expect(val === 2);
  });
});
