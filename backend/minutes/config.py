# Switching environments: `ENV_FOR_MINUTES=production minutes`
import os
from dynaconf import Dynaconf

HERE = os.path.dirname(os.path.abspath(__file__))

settings = Dynaconf(
    envvar_prefix="minutes",
    env_switcher="ENV_FOR_MINUTES",
    settings_files=["settings/config.toml"],
    environments=["development", "production"],
    load_dotenv=False,
)
