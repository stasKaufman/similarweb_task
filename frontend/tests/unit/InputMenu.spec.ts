import { shallowMount } from '@vue/test-utils';
import InputMenu from '@/components/sideMenu/InputMenu.vue';
import SocketioService from '../../src/services/SocketService';
import { ElInput, ElButton } from './mocks/element-ui';

// mock SocketioService
jest.mock('@/services/SocketService.ts', () => ({
  emit: jest.fn(),
}));

describe('InputMenu.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(InputMenu, {
      global: {
        components: {
          'el-input': ElInput,
          'el-button': ElButton,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('clears the input field after submit is called', () => {
    wrapper.setData({ url: 'https://www.youtube.com/watch?v=123456' });
    wrapper.vm.submit();
    expect(wrapper.vm.url).toBe('');
  });

  it('does not emit newURL event when submit is called with an invalid URL', () => {
    wrapper.setData({ url: 'invalid_url' });
    wrapper.vm.submit();
    expect(SocketioService.emit).not.toBeCalled();
  });

  it('emits newURL event when submit is called with a valid YouTube URL', () => {
    wrapper.setData({ url: 'https://www.youtube.com/watch?v=123456' });
    wrapper.vm.submit();
    expect(SocketioService.emit).toBeCalledWith('newURL', 'https://www.youtube.com/watch?v=123456');
  });
});
