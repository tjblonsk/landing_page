(function($) {
// validate email
// validate username
// hide/show username field
// handle tweet
// submit form

  /*
   * TODO: Validators should handle error state for the given element
   *       and handle eager validation once error has been triggered
   */
  var EmailValidator = function($el) {
    this.$el = $el;
    this.valid = function() {
      var re = /^.+\@.+\..+/;
      return re.test(this.$el.val());
    }
  }

  var UsernameValidator = function($el) {
    this.$el = $el;
    this.valid = function() {
      return $.post('signups/dup',{username: $('#signup_username').val()}, function(data){}, 'JSON');
    }
  }

  var Form = {

    init: function() {
      this.$el = $('form');
      this.bind_events();

      this.email_validator = new EmailValidator(this.$el.find('#signup_email'));
      this.username_validator = new UsernameValidator(this.$el.find('.username_field'));

      this.render_stage();
    },

    bind_events: function() {
      var self = this;
      this.$el.on('submit', function(e) {
        e.preventDefault();
        self.handle_submit();
        return false;
      });

      // TODO: (possibly) bind click events for submit buttons

      $('.send_tweet').tweetAction({
        text: 'I just reserved my username for Steelos.com',
        url: 'http://steelos.com',
        via: 'steelos',
        related: 'steelos'
      },function(){
        self.submit_form();
      });


    },

    handle_submit: function(e) {
      var self = this;
      if (this.stage === 'blank') {
        // validate email
        if (this.email_validator.valid()) {
          if (this.claim_username()) {
            this.enter_email();
          }
          else {
            this.submit_form();
          }
        }
        return;
      }
      else if (this.stage === 'email_entered') {
        this.username_validator.valid().done(function() {
          self.enter_username();
        });
        return;
      }
    },

    claim_username: function() {
      return this.$el.find('.claim_username').first().is(':checked');
    },


    // form stage should be set in each handler to: %w{ blank email_entered form_submitted }
    stage: 'blank',

    render_stage: function() {
      this.$el.removeClass('blank email_entered form_submitted');
      this.$el.addClass(this.stage);
    },


    // form stage handlers
    enter_email: function() {
      this.stage = 'email_entered';
      this.render_stage();
    },

    enter_username: function() {
      this.$el.find('.send_tweet').trigger('click');
    },

    submit_form: function() {
      var self = this;
      $.ajax({
        url: '/signups',
        type: 'POST',
        data: self.$el.serialize(),
        dataType: 'json'
      }).done(function() {
        self.stage = 'form_submitted';
        // transition form to show submission confirmation
        self.render_stage();
      });
    }
  }

  $(function() {
    Form.init();
  });

  window.Form = Form;

})(jQuery);
