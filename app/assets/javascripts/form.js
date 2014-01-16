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
      // TODO: send ajax call to signups#dup
      return $.post('signups/dup',{username: $('#signup_username').val()}, function(data){}, 'JSON');

      // TODO: return xhr promise
    }
  }

  var Form = {

    init: function() {
      this.$el = $('form');
      this.bind_events();

      // TODO: replace these selectors with appropriate selectors for the input fields
      this.email_validator = new EmailValidator(this.$el.find('#signup_email'));
      this.username_validator = new UsernameValidator(this.$el.find('.username_field'));

      this.render_stage();
    },

    bind_events: function() {
      var self = this;
      this.$el.on('submit', function() {
        self.handle_submit();
      });

      // TODO: (possibly) bind click events for submit buttons

      // TODO: make sure there is a .send_tweet element. It should be hidden and should
      // not be the same element the you click to submit the username
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
      e.preventDefault();

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
      }
      else if (this.stage === 'email_entered') {
        this.username_validator.valid().success(function() {
          this.enter_username();
        });
      }
    },

    claim_username: function() {
      // TODO: return true if the box checked to reserve username
    },


    // form stage should be set in each handler to: %w{ blank email_entered form_submitted }
    stage: 'blank',

    render_stage: function() {
      // TODO: define styles that hide and show elements when the form has a given css class
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
      // TODO: serialize and submit form
      $.ajax({}).success(function() {
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
