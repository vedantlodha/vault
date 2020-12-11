import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import sinon from 'sinon';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | box-radio', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.type = 'aws';
    this.displayName = 'An Option';
    this.mountType = '';
    this.disabled = false;
  });

  const spy = sinon.spy();
  this.set('onRadioChange', spy);

  test('it renders', async function(assert) {
    await render(hbs`<BoxRadio
      @value={{type}}
      @type={{type}}
      @glyph={{type}}
      @displayName={{displayName}}
      @onRadioChange={{onRadioChange}}
      @disabled={{disabled}}
    />`);

    assert.dom(this.element).hasText('An Option', 'shows the display name of the option');
    assert.dom('.tooltip').doesNotExist('tooltip does not exist when disabled is false');
    await click('[data-test-mount-type="aws"]');
    await settled();
    assert.ok(spy.calledOnce, 'calls the radio change function when option clicked');
  });

  test('it renders correctly when disabled', async function(assert) {
    const spy = sinon.spy();
    this.set('onRadioChange', spy);
    await render(hbs`<BoxRadio
      @value={{type}}
      @type={{type}}
      @glyph={{type}}
      @displayName={{displayName}}
      @onRadioChange={{onRadioChange}}
      @disabled=true
    />`);

    assert.dom(this.element).hasText('An Option', 'shows the display name of the option');
    assert.dom('.ember-basic-dropdown-trigger').exists('tooltip exists');
    await click('[data-test-mount-type="aws"]');
    assert.ok(spy.notCalled, 'does not call the radio change function when option is clicked');
  });
});
