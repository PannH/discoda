/**
 * The options for the command auto deferral
 */
export default interface CommandAutoDeferralOptions {
   /**
    * Whether or not the command should be deferred automatically
    * 
    * @default `false`
    */
   enabled: boolean;
   /**
    * Whether or not the deferral should be ephemeral
    * 
    * @default `false`
    */
   ephemeral: boolean;
}