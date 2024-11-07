import { inject, computed } from "vue";
import type { 
  Environment, 
  EnvForm, 
  EnvInstruction, 
  EnvLabel, 
  EnvMessage, 
  EnvPermission, 
  EnvSocial, 
  EnvTitle, 
  EnvUrl, 
  EnvUser, 
  EnvValidation 
} from "@/types/environment";


export const useLogin = () => {
  const env = inject("environment") as Environment;


  const getUsernameLabel = () => {
    if (!env.permissions.loginWithEmailAllowed) return env.labels.username;
    if (!env.permissions.registrationEmailAsUsername) return env.labels.usernameOrEmail;
    return env.labels.email
  }

  const getImage = (url: string): string => `${env.urls.resourcesPath}/images${url}`;

  const getSummary = (message: string): string => message.replace(/(&#64;)/g, "@");

  const getUrl = (url: string): string => url.replace(/(&amp;)/g, "&");


  return {
    forms: computed(() => env.forms as EnvForm),
    instruction: computed(() => env.instruction as EnvInstruction),
    labels: computed(() => env.labels as EnvLabel),
    message: computed(() => env.message as EnvMessage),
    permissions: computed(() => env.permissions as EnvPermission),
    social: computed(() => env.social as EnvSocial[]),
    titles: computed(() => env.titles as EnvTitle),
    urls: computed(() => env.urls as EnvUrl),
    user: computed(() => env.user as EnvUser),
    validations: computed(() => env.validations as EnvValidation),
    getImage,
    getUrl,
    getUsernameLabel,
    getSummary
  }
}
